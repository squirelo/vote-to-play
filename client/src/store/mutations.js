

export const SET_GAME = 'SET_GAME'
/*
Vote type is implicitly set by the streamer's set game in twitch.
Otherwise, vote type is toggled by streamer in live config

Changing a game mid-broadcast will override current selected vote type
*/
export const SET_VOTE_TYPE = 'SET_VOTE_TYPE'

export const SET_AUTH = 'SET_AUTH';
export const SET_CURRENT_VOTE = 'SET_CURRENT_VOTE'
export const ADD_VOTE = 'ADD_VOTE'
export const START_NEW_VOTE = 'START_NEW_VOTE'
export const SET_HEROES = 'SET_HEROES'

export const SELECT_CANDIDATE ='SELECT_CANDIDATE'

export const SET_TOP_TWITCH_GAMES = 'SET_TOP_TWITCH_GAMES'
//testing
export const TOGGLE_VOTE_SIMULATION = 'TOGGLE_VOTE_SIMULATION'