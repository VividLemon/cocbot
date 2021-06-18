const Discord = require('discord.js')
const {prefix, token} = require('./config/config.json');
const bot = new Discord.Client();
const fs = require('fs');

bot.login(token);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}! alpha version`);
    bot.user.setActivity(`use ${prefix}help for commands`, {
        type: "PLAYING"
    });
})

