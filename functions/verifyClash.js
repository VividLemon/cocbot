const { clan_tag } = require("../config/config.json")
const addRole = require("./addRole")
const convertCoCRoleToDiscord = require("./convertCoCRoleToDiscord")
const removeRole = require("./removeRole.js")
const expireTimeInSeconds = 15

module.exports = (message, args = []) => {
	if(args.length === 2) {
		const tag = args[0]
		const token = args[1]
		let name
		let clanRole
		let authed = true

		global.client.player(tag).then((resp) => {
			if(resp.clan.tag !== clan_tag) return message.reply("You don't seem to be in our clan! Join now!")
			name = resp.name
			clanRole = resp.role
		}).catch(() => {
			authed = false
			message.reply("Player tag wasn't found, try again!")
		})
			.then(() => {
				global.client.verifyPlayerToken(tag, token).then((resp) => {
					if(resp.status === "ok") {
						addRole(message, "authenticated")
						const discordRole = convertCoCRoleToDiscord(clanRole)

						try{
							// if(message.guild.me.permissions.missing('MANAGE_NICKNAMES')) return message.reply("I'm missing permissions to manage nicknames. Sorry!")
							if(message.author.id === message.guild.ownerID) throw new Error
							message.member.setNickname(name)
						}catch(err) {
							message.reply(`I'm missing permissions to auto manage your nickname, you are probably the guild owner.\n(If you're not the guild owner, send <@${message.guild.ownerID}> a message with this error)`)
						}
						addRole(message, discordRole)
						removeRole(message, "unauthenticated")
						message.reply(`Great! You have been verified! This chat will auto close in ${expireTimeInSeconds} seconds`)
						setTimeout(() => {
							if(message.guild.channels.cache.find((channel) => channel.name === `auth-${message.author.id}`)) {
								message.guild.channels.cache.find((channel) => channel.name === `auth-${message.author.id}`).delete()
							}else{
								console.warn(`Channel auth-${message.author.id} was probably already deleted...`)
							}
						}, 1000 * expireTimeInSeconds)
					}else if(resp.status !== "ok" && authed) {
						message.reply("Your api token was invalid. Try again.")
					}
				})
			})
	}else if(args.length === 1 || args.length === 0) {
		message.reply("Sorry, but you need *both* the player tag and api token to proceed")
	}else{
		message.reply("Sorry, but you must have *only* the player tag and api token to proceed")
	}
}
