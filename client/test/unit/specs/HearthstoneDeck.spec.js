
import store from '@/store'
import HearthstoneDeck from '@/components/page-config/HearthstoneDeck'
import { NAMESPACE as HEARTHSTONE } from '@/store/modules/games/hearthstone'


describe('HearthstoneDeck.vue', ()=>{
    let deck = {
        class: 'Warrior',
        name: 'Dragon Warrior'
    }

    store.state.games[HEARTHSTONE].decks.push(deck)

    const Constructor = Vue.extend(HearthstoneDeck)
    const vm = new Constructor({
        store
    }).$mount()

    it('prevents duplicating original classes',()=>{
        vm.selectedClass = 'Warrior'
        vm.deckName = 'Warrior'
        expect(vm.isDuplicate).to.be.true
    })

    it('prevents duplicate deck creation', ()=>{
        vm.selectedClass = 'warrioR'
        vm.deckName = 'dRaGon WarrioR'
        expect(vm.isDuplicate).to.be.true
    })
})

