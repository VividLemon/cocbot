module.exports = async (message, reactions) => {
    if(reactions.length){
        reactions.forEach(reaction => {
            message.react(reaction)
            reactions.shift()
        })
    }
}