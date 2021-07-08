const { clan_tag } = require('../config/config.json')

module.exports = (message, perf) => {
    let msg = ""

    global.client.currentClanWar(clan_tag).then((resp) => {
        msg = `\`\`\`yaml\nPhase: ${resp.state}, Player Count: ${resp.teamSize}`
        if(resp.state === "notInWar") {
            return message.reply(`You're not currently in a war! (leagues don't count as wars)`)
        }else if(resp.state !== 'preparation') {
            msg += `\nAttacks Used: ${resp.clan.attacks} out of ${resp.teamSize * 2}`
        }
        if(perf && perf >= 1) {
            msg += `\nMembers:`
            resp.clan.members.forEach((member) => {
                msg += `\nName: ${member.name}, th level: ${member.townhallLevel}, position: ${member.mapPosition}`
                if(resp.state !== 'preparation') {
                    msg += `, attacks used: ${member.opponentAttacks}`
                }
            })
        }
        if(perf && perf >= 2) {
            msg += "\n\nEnemies:"
            if(resp.state !== 'preparation') {
                msg += `\nAttacks Used: ${resp.opponent.attacks} out of ${resp.teamSize * 2}`
            }
            resp.opponent.members.forEach((member) => {
                msg += `\nName: ${member.name}, th level: ${member.townhallLevel}, position: ${member.mapPosition}`
                if(resp.state !== 'preparation') {
                    msg += `, attacks used: ${member.opponentAttacks}`
                }
            })
        }
        msg += `\`\`\``
        if(msg.length > 2000) return message.reply("Sorry, perf values aren't implemented yet due to discords 2000 character limit policy")
        return message.reply(msg)
    })
}
