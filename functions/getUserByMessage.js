module.exports = (message) => {
    return message.guild.members.cache.get(message.author.id)
}