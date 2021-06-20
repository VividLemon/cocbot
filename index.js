const Discord = require('discord.js')
const {prefix, token, clan_tag, coc_api_key} = require('./config/config.json');
const bot = new Discord.Client();

const fs = require('fs');
const axios = require('axios')
const keyv = require('keyv');

const firstMessage = require('./functions/firstMessage.js');
const createPrivateChannel = require('./functions/createPrivateChannel.js');

bot.login(token);

bot.once('ready', () => {
    console.info(`Logged in as ${bot.user.tag}! alpha version`);
    bot.user.setActivity(`use ${prefix}help for commands`, {
        type: "PLAYING"
    });
    try{
        const msg = `Hello, to start the verification process please add the following reaction`
        firstMessage(bot, '855560503044472893', msg, ['📨'])
    }
    catch{
        console.error("You need to set the default lobby");
    }
})

bot.on('guildMemberAdd', ( member ) => { 
    try{
        const unauthRoleId = member.guild.roles.cache.find(role => role.name === "unauthenticated").id;
        member.roles.add(unauthRoleId); 
    }
    catch{
        member.guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0).send('There is no unauthenticated role!')
    }
})

bot.on('messageReactionAdd', (reaction, user) => {
    if(user.bot) return;
    if(reaction.message.channel.id === '855560503044472893'){
        createPrivateChannel(reaction, user, bot, 10);
    }
})

bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();


    if(command == 'f'){
        console.log(message);
    }
})