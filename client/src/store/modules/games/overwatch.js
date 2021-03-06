import gameApi from '@/api/game-api'
import * as MUTATIONS from '@/store/mutations'
import * as ACTIONS from '@/store/actions'
import whitelistMixin from './util/whitelistMixin';
import { gameOptions, gameMixin } from './util/gameMixin'

export const NAMESPACE = 'Overwatch'

const ow = _.merge({},gameMixin,whitelistMixin,{
    namespaced: true,
    state: {
        gameName: NAMESPACE,
        candidateNomenclature: 'hero',
        className: 'overwatch',
		gameOptions: gameOptions(),
        candidates: [],
        filters:[
            {
                id:'name',
                type:'text',
                vmodel:'',
                placeholder: 'Search heroes'
            },
            {
                id:'role',
                type:'select',
                vmodel:'Role',
                options:['Role']
            }
        ]
    },
    mutations:{
        [MUTATIONS.SET_CANDIDATES](state,{ candidates }){
			state.candidates = candidates
		},
        [MUTATIONS.SET_FILTERS](state, { candidates }){
            const roles = _(candidates).map(d=>d.type).uniq().sort().value()
            state.filters[1].options.push(...roles)
        },
    },
    actions:{
        [ACTIONS.GET_CANDIDATES]({commit}){
			return gameApi.fetchJson('overwatch_heroes.json')
            .then((response)=>{
                const candidates = response.data
                commit(MUTATIONS.SET_CANDIDATES,{ candidates })
                commit(MUTATIONS.SET_FILTERS,{ candidates })
			})
		}
    },
    getters:{
        candidates(state){
            return state.candidates
        },
        filteredCandidates({candidates}, {activeFilters}){
            return candidates.filter(candidate=>{
                return activeFilters.every(({id,vmodel,options})=>{
                    if(id === 'name')
                        return candidate.name.toLowerCase().includes(vmodel.toLowerCase())
                    else if(id === 'role' && vmodel !== options[0])
                        return candidate.type === vmodel
                })
            })
        },
    }
})

export default ow
