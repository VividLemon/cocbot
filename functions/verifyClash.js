const {prefix, token, clan_tag, coc_api_key} = require('../config/config.json');
const { Client } = require('clashofclans.js');
const addRole = require('./addRole');
const convertCoCRoleToDiscord = require('./convertCoCRoleToDiscord');
const removeRole = require('./removeRole.js');
const client = new Client({ token: coc_api_key, timeout: 5000})
const expireTimeInSeconds = 15;

module.exports = (message, args = []) => {
    if(args.length === 2){
        const tag = args[0];
        const token = args[1];
        // api fetch
        let name;
        let clanRole;
        client.player(tag).then(resp => {
            if(resp.clan.tag !== clan_tag) return message.reply("You don't seem to be in our clan! Join now!");
            name = resp.name;
            clanRole = resp.role;
        })
        .then(resp => {
            client.verifyPlayerToken(tag, token).then(resp => {
                if(resp.status === 'ok'){
                    addRole(message, "authenticated");
                    const discordRole = convertCoCRoleToDiscord(clanRole);
                    addRole(message, discordRole);
                    removeRole(message, "unauthenticated");
                    message.reply(`Great! You have been verified! This chat will auto close in ${expireTimeInSeconds} seconds`);
                    setTimeout(() => {
                        if(message.guild.channels.cache.find(channel => channel.name === `auth-${message.author.id}`)){
                            message.guild.channels.cache.find(channel => channel.name === `auth-${message.author.id}`).delete();
                        }else{
                            console.warn(`Channel auth-${message.author.id} was probably already deleted...`)
                        }
                    }, 1000 * expireTimeInSeconds);
                    
                }else{
                    message.reply("That's not right, your api token might be invalid.")
                }
            })
        })
    }else if(args.length === 1){
        message.reply("Sorry, but you need *both* the player tag and api token to proceed");
    }else if(args.length === 0){
        //TODO create wizard
    }else{
        message.reply("Sorry, but you must have *only* the player tag and api token to proceed");
    }
}