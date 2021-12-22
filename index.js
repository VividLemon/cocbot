const Discord = require('discord.js')
const { prefix, token, coc_api_key, email, password } = require('./config/config.json')
const bot = new Discord.Client()
const firstMessage = require('./functions/firstMessage.js')
const createPrivateChannel = require('./functions/createPrivateChannel.js')
const verifyClash = require('./functions/verifyClash.js')
const getClanWarInfo = require('./functions/getClanWarInfo')
const getMembersList = require('./functions/getMembersList')
const donationMessage = require('./functions/donationMessage')
const clearCommands = require('./functions/clearCommands')
const { Client } = require('clashofclans.js')

const client = new Client({ keys: [coc_api_key] })

global.client = client

bot.login(token)

bot.once('ready', () => {
	console.info(`Logged in as ${bot.user.tag}! alpha version`)
	bot.user.setActivity(`use ${prefix}help for commands`, {
		type: 'PLAYING'
	})
	try{
		const msg = `Hello, to start the verification process please add the following reaction`

		firstMessage(bot, '855560503044472893', msg, ['📨'])
	}
	catch{
		console.error('You need to set the default lobby')
	}

	( async () => {
		await client.init({ email, password })
	})

})

bot.on('guildMemberAdd', ( member ) => {
	try{
		const unauthRoleId = member.guild.roles.cache.find((role) => role.name === 'unauthenticated').id

		member.roles.add(unauthRoleId)
	}
	catch{
		member.guild.channels.cache.filter((chx) => chx.type === 'text').find((x) => x.position === 0).send('There is no unauthenticated role!')
	}
})

bot.on('messageReactionAdd', (reaction, user) => {
	if(user.bot) return
	if(reaction.message.channel.id === '855560503044472893') {
		createPrivateChannel(reaction, user, bot)
	}
})

bot.on('message', async (message) => {
	if(!message.content.startsWith(prefix) || message.author.bot) return
	const args = message.content.slice(prefix.length).trim().split(/ +/)
	const command = args.shift().toLowerCase()

	if(command === 'verify') {
		verifyClash(message, args)
	}
	else if(command === 'war') {
		getClanWarInfo(message, args[0])
	}
	else if(command === 'team') {
		getMembersList(message, args[0])
	}
	else if(command === 'donate') {
		donationMessage(message)
	}else if(command === 'ping') {
		return message.reply('pong')
	}else if(command === 'clear') {
		clearCommands(message, bot, false, args[0])
	}else if(command === 'clearall') {
		// clearCommands(message, bot, true, args[0])
	}
})
