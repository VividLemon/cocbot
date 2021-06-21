const {prefix} = require('../config/config.json');
module.exports = (reaction, user, bot) => {
    const expireTimeInMinutes = 10;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(!member.roles.cache.has(member.guild.roles.cache.find(role => role.name === "unauthenticated").id)) return;
    if(typeof reaction.message.guild.channels.cache.find(channel => channel.name === `auth-${user.id}`) !== 'undefined') return;
    const everyoneRole = reaction.message.guild.roles.cache.find(role => role.name === "@everyone");
    const newChannel = reaction.message.guild.channels.create(`auth-${user.id}` ,{
        parent: reaction.message.channel.parentID,
        permissionOverwrites: [
            {
                id: everyoneRole.id,
                deny: ['VIEW_CHANNEL']
            },
            {
                id: user.id,
                allow: ['VIEW_CHANNEL']
            },
            {
                id: bot.user.id,
                allow: ['VIEW_CHANNEL']
            }
        ]
    }).then((resp) => {
        resp.send(`<@${user.id}> please use the *${prefix}verify* command.\nAny information here is only viewable by us and server admins. \nNobody else will be able to view this private chat.\nThis chat will automatically delete after ${expireTimeInMinutes} minutes!\nApi tokens are not dangerous, they will automatically reset on CoC after their one time use has expired!\nPlease use \`\`\`${prefix}verify {player_tag} {player_token}\`\`\``);

        // auto delete
        setTimeout(() => {
            if(reaction.message.guild.channels.cache.get(resp.id)){
                resp.delete();//TODO
            }else{
                console.warn(`Channel ${resp.id} was probably already deleted...`)
            }
        }, 1000 * 60 * expireTimeInMinutes);
    })
}