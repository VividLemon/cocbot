const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift();
    if(reactions.length > 0){
        setTimeout(() => {
            addReactions();
        }, 750);
    }
}

module.exports = async (bot, channelId, text, reactions = []) => {
    const channel = await bot.channels.fetch(channelId);

    channel.messages.fetch().then(messages => {
        if(messages.size === 0){
            channel.send(text).then(message => {
                addReactions(message,reactions);
            })
        }else{
            for(const message of messages) {
                message[1].edit(text)
                addReactions(message[1], reactions)
            }
        }
    });

    
}