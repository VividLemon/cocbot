const { clan_tag } = require('../config/config.json')

module.exports = (message, perf) => {
    let msg = ""

    global.client.clanMembers(clan_tag).then((resp) => {
        msg = `\`\`\`yaml\n`
        resp.items.forEach((element) => {
            msg += `Name: ${element.name}, Level: ${element.expLevel}, Role: ${element.role}`
            if(perf >= 1) {
                msg += `\nDonations given: ${element.donations}, Donations received: ${element.donationsReceieved}`
            }
            if(perf >= 2) {
                msg += `Trophies: ${element.trophies}`
            }
            if(perf >= 3) {
                msg += `League level ${element.league.name}`
            }
            msg += `\n`
        })
        msg += `\`\`\``
        if(msg.length > 2000) return message.reply("Sorry, perf values aren't implemented yet due to discords 2000 character limit policy")
        return message.reply(msg)
    })

}
