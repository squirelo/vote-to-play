var db = require('../db.js')

module.exports = {
    saveHearthstoneDecks({channelId, decks}) {
        var channels = db.get().collection('channels')
        return channels.updateOne({ channelId },{ $set: { hearthstoneDecks: decks} })
    },
    getHearthstoneDecks(channelId) {
        var channels = db.get().collection('channels')
        return channels.findOne({ channelId },{ 'hearthstoneDecks': 1 , '_id': 0})
                .then(result=>{
                    return result.hearthstoneDecks
                })
    },
}
