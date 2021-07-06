const addReactions = (message, reactions) => {
    if(reactions.length){
        reactions.forEach(reaction => {
            message.react(reaction);
            reactions.shift();
        });
    }
    // message.react(reactions[0])
    // reactions.shift();
    // if(reactions.length > 0){
    //     setTimeout(() => {
    //         addReactions();
    //     }, 750);
    // }
}

module.exports = async (bot, channelId, text, reactions = []) => {
    const channel = await bot.channels.fetch(channelId);
    channel.messages.fetch().then(messages => {
        if(messages.size === 0){
            channel.send(text).then(message => {
                addReactions(message,reactions);
            })
        }else{
            messages.forEach(message => {
                if(message.author.id != bot.user.id) return; 
                if(message.content !== text){
                    message.edit(text)
                }
                addReactions(message, reactions)
            });
        }
    });

    
}