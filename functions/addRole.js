const getUserByMessage = require('./getUserByMessage')
module.exports = (message, roleName) => {
    const user = getUserByMessage(message);
    const role = message.guild.roles.cache.find(role => role.name === roleName);
    user.roles.add(role);
}