

import util from '@/util'
import * as MUTATIONS from '@/store/mutations'
import * as ACTIONS from '@/store/actions'

export const NAMESPACE_HOTS = 'hots'

const IMG_BASE_URL = 'https://d1i1jxrdh2kvwy.cloudfront.net/Images/Heroes/Portraits/'

const hots = {
    namespaced: true,
    state: { 
        gameName: 'Heroes of the Storm',
        characterNomenclature: 'hero',
        maxResults: 5,
        heroes: []
    },
    mutations:{
        [MUTATIONS.SET_HEROES](state, { heroes }){
            state.heroes = heroes
        }
    },
    actions:{
        [ACTIONS.GET_HEROES]({commit}){
            axios.get('https://api.hotslogs.com/Public/Data/Heroes')
            .then((response)=>{
                let heroes = _.map(response.data,(val)=>{
                    val.name = val.PrimaryName;
                    val.img = IMG_BASE_URL + val.ImageURL + '.png';
                    val.imgSplash = cl.url("hots/splash/" + val.ImageURL + `_splash.jpg`);
                    return val
                })
                commit(MUTATIONS.SET_HEROES,{ heroes })
            })
        }
    }
}




export default hots