const { wallet } = require('../config/config.json')

module.exports = (message) => {
    message.reply(`Thank you for considering donating, if you are committed to donating to the bot's development you can donate ***Bitcoin*** (BTC) to... \`\`\`${wallet}\`\`\`*Any proceeds will strictly be put towards bot upkeep costs*\nIt is important to note, it must be EXACTLY that bitcoin wallet, and it MUST be in bitcoin. Any other values will result in lost currency!\n(<@${message.guild.ownerID}>)`)
}
