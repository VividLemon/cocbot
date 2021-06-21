const getUserByMessage = require("./getUserByMessage")

module.exports = (message, name) => {
    const user = getUserByMessage(message);
    user.setNickname(name);
}