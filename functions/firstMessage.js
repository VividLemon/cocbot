const addReactions = require('./addReactions')

module.exports = async (bot, channelId, text, reactions = []) => {
    const channel = await bot.channels.fetch(channelId)

    channel.messages.fetch().then(messages => {
        if(messages.size === 0){
            channel.send(text).then(message => {
                addReactions(message,reactions)
            })
        }else{
            messages.forEach(message => {
                if(message.author.id != bot.user.id) return
                if(message.content !== text){
                    message.edit(text)
                }
                addReactions(message, reactions)
            })
        }
    })

}
