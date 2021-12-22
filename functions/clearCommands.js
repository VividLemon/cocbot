
module.exports = async (message, bot, runs = 50) => {
	const channel = await bot.channels.fetch(message.channel.id)

	if(message.channel.id === message.guild.channels.cache.find((channel) => channel.name === "waiting-lobby").id) {
		const botMessage = await message.reply("You can't run that here!")

		return setTimeout(() => {
			botMessage.delete()
			message.delete()
		}, 10000)
	}

	channel.messages.fetch()
		.then((messages) => {
			let count = 0

			messages.forEach((message) => {

				if(runs === count) {
					return
				}else{
					count += 1
				}
				if(message.author.bot) {
					message.delete()
				}
			})
		})

}
