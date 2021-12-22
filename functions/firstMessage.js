const addReactions = require("./addReactions")

module.exports = async (bot, channelId, text, reactions = []) => {
	const channel = await bot.channels.fetch(channelId)

	channel.messages.fetch().then((messages) => {
		if(messages.size === 0) {
			channel.send(text).then((message) => {
				addReactions(message,reactions)
			})
		}else{
			let disallowedMessages = []

			messages.forEach((message) => {
				if(message.author.id !== bot.user.id) {
					disallowedMessages.push(message)
				}else if(message.content !== text) {
					message.edit(text)
					addReactions(message, reactions)
				}
			})
			if(disallowedMessages.length) return channel.guild.channels.cache.find((channel) => channel.name === "super-admin-gen").send(`\`\`\`yaml\nDisallowed messages in ${channel.name}\nThe waiting lobby should be clear!\`\`\``)
		}
	})

}
