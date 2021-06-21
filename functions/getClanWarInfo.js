const {prefix, token, clan_tag, coc_api_key} = require('../config/config.json');
const { Client } = require('clashofclans.js');
const client = new Client({ token: coc_api_key, timeout: 5000})
module.exports = (message, perf) => {
    let msg = "";
    client.currentClanWar(clan_tag).then(resp => {
        msg = `\`\`\`yaml\nPhase: ${resp.state}, Player Count: ${resp.teamSize}`
        if(resp.state != 'preparation'){
            msg += `\nAttacks Used: ${resp.clan.attacks} out of ${resp.teamSize * 2}`
        }
        if(perf && perf >= 1){
            msg += `\nMembers:`
            resp.clan.members.forEach(member => {
                msg += `\nName: ${member.name}, th level: ${member.townhallLevel}, position: ${member.mapPosition}`;
                if(resp.state != 'preparation'){
                    msg += `, attacks used: ${member.opponentAttacks}`
                }
            })
        }
        if(perf && perf >= 2){
            msg += "\n\nEnemies:"
            if(resp.state != 'preparation'){
                msg += `\nAttacks Used: ${resp.opponent.attacks} out of ${resp.teamSize * 2}`
            }
            resp.opponent.members.forEach(member => {
                msg += `\nName: ${member.name}, th level: ${member.townhallLevel}, position: ${member.mapPosition}`;
                if(resp.state != 'preparation'){
                    msg += `, attacks used: ${member.opponentAttacks}`
                }
            })
        }
        msg += `\`\`\``
        if(msg.length > 2000) return message.reply("Sorry, perf values aren't implemented yet due to discords 2000 character limit policy");
        return message.reply(msg);
    })
    
    
}