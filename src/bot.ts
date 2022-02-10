import {Client, Intents, Collection, CommandInteraction} from 'discord.js'
import { Client as CocClient } from 'clashofclans.js'
import { readdirSync } from 'fs'
import { join } from 'path'

const cocClient = new CocClient({ keys: [process.env.COC_API_KEY!] })

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = new Collection()
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const path = join(__dirname, 'commands', file)
  import(path).then((resp) => {
    client.commands.set(command.data.name, resp)
  })
}

client.once('ready', () => {
  client.user?.setActivity('/ Slash commands', { type: 'WATCHING' })
})

client.on('interactionCreate', async (interaction: CommandInteraction) => {
  if (!interaction.isCommand()) return
  const command = client.commands.get(interaction.commandName)
  try {
    command.execute(interaction)
  } catch (err) {
    console.error({ error: err, interaction })
    return await interaction.reply({ content: 'There was an error while trying to execute this command\nError was logged', ephemeral: true })
  }
})

client.on('guildDelete')
// on these events, add or remove the guild from the db
// on commands that require it, check if the coc credentials were set, if they weren't, send default message
client.on('guildCreate')

client.login(process.env.TOKEN)

export {
  cocClient
}
