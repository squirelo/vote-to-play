import * as M from './mutations'
import * as A from './actions'

import socket from '@/api/socket'
import voteApi from '@/api/vote'
import games from './modules/games/_main'

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const { VOTE_MODE_VIEWER } = require('@shared/constants')


//potential values will be same as selectedGame, with the addition of "All Games"
const voteCategory = null;
//free-for-all vs whitelisted votes
const voteMode = VOTE_MODE_VIEWER

export const state = {
    channelId: -1,
    channelName: 'The broadcaster',
    userId: -1,
    //set by streamer's game set in dashboard
    selectedGame: null,
    //potential values will be same as selectedGame, with the addition of "All Games"
    voteCategory,
    voteMode,
    selectedCandidate:{},
    currentVote:{
        votes:[],
        voteCategory,
        voteMode,
        createdAt: null,
    },
    isAuthed: false,
    token: null,
    TESTING:{
        IS_DEVELOPMENT,
        isSimulating: false && IS_DEVELOPMENT,
        unlimitedVotes: false && IS_DEVELOPMENT
    }
}

export const mutations = {
    [M.SET_AUTH]( state, payload ){
        state.isAuthed = true;
        state.token = payload.token;
        state.channelId = payload.channelId
        state.channelName = payload.channelName
        state.userId = payload.userId
    },
    [M.SET_GAME]( state, game ){
        state.selectedGame = game
        state.selectedCandidate = {}
    },
    [M.SET_VOTE_CATEGORY]( state, voteCategory ){
        state.voteCategory = voteCategory
        state.selectedCandidate = {}
    },
    [M.SET_VOTE_MODE]( state, voteMode ){
        state.voteMode = voteMode
    },
    [M.SET_CURRENT_VOTE]( state, currentVote ){

        state.voteCategory = currentVote.voteCategory
        state.voteMode = currentVote.voteMode
        Object.assign(state.currentVote,currentVote)
        state.selectedCandidate = {}
    },
    [M.ADD_VOTE]( state, vote ){
        state.currentVote.votes.push(vote)
    },
    [M.SELECT_CANDIDATE]( state, candidate ){
        state.selectedCandidate = candidate
    },
    [M.TOGGLE_VOTE_SIMULATION]( state, payload ){
        state.TESTING.isSimulating = payload
    },
}

export const actions = {
    [A.VOTE]( {state}, payload ){
        voteApi.addVote({
            channelId: state.channelId,
            vote: payload.vote,
            userId: payload.userId
        });
    },
    [A.START_NEW_VOTE]( {state} ){
        voteApi.startVote({
            channelId: state.channelId,
            voteCategory: state.voteCategory,
            voteMode: state.voteMode,
            createdAt: new Date(),
            votes: [],
        })
    },
    [M.SET_AUTH]( {commit}, payload ){
        commit(M.SET_AUTH, payload)
        socket.connect(process.env.SERVER_URL, payload)
    },
}

export const getters = {
    userVote(state){
        let userVote = state.currentVote.votes.find(vote=>vote.userId === state.userId)
        if( !_.isUndefined(userVote) )
            return userVote.vote
        else
            return null;
    },
    hasSubmittedVote(state,getters){
        if(state.TESTING.unlimitedVotes)
            return false
        else
            return getters.userVote !== null
    },
    hasSelectedCandidate(state){
        return !_.isEmpty(state.selectedCandidate);
    },
    /*
    Twitch Docs:
    An opaque ID that begins with “A” is a logged-out user and should not be persisted.
    It will change every time the logged-out user loads your extension.

    They are NOT ALLOWED to vote.
    */
    isAnonymousUser(state){
        return state.userId.charAt(0) === 'A'
    }
}

export const modules = {
    games
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules
})

export default store
