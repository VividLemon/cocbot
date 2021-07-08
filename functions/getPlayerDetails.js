
module.exports = (args) => {
    global.client.player(args[0]).then((resp) => {
        console.log(resp)
    })
}
