import { join } from 'path'
import { ShardingManager } from 'discord.js'
import 'dotenv/config'

const manager = new ShardingManager(join(__dirname, './bot.js'), {token: process.env.TOKEN})

manager.on('shardCreate', (shard) => console.log(`Launched shard on ${shard.id}`))

manager.spawn()
