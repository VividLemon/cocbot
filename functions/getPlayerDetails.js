const {coc_api_key} = require('../config/config.json')
const { Client } = require('clashofclans.js')
const client = new Client({ token: coc_api_key, timeout: 5000})

module.exports = (args) => {
    client.player(args[0]).then(resp => {
        console.log(resp)
    })
}
