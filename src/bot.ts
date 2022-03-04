import { Client, Intents, Collection } from 'discord.js'
import { Client as CocClient } from 'clashofclans.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import { I18n } from 'i18n'
import Keyv from 'keyv'
import getLang from './util/getLang'
import { apiErrorHandler } from './error'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = new Collection()
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const path = join(__dirname, 'commands', file)
  import(path).then((command) => client.commands.set(command.default.data.name, command))
}

client.once('ready', () => {
  client.user!.setActivity('/ Slash commands', { type: 'WATCHING' })
  console.log('Ready')
})

const cocClient = new CocClient()
cocClient.login({ email: process.env.COC_EMAIL!, password: process.env.COC_PASSWORD! })

const keyv = new Keyv(`sqlite://${join(process.cwd(), 'sqlite', 'clans.sqlite')}`)
keyv.on('error', (error) => console.error(`Keyv error: ${error}`))

const i18n = new I18n()

i18n.configure({
  locales: ['en'],
  directory: join(process.cwd(), '/lang'),
  retryInDefaultLocale: true,
  defaultLocale: 'en'
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return
  const command = client.commands.get(interaction.commandName)
  try {
    i18n.setLocale(await getLang(interaction.locale))
    return command.execute(interaction)
  } catch (error: unknown) {
    apiErrorHandler(error, interaction)
  }
})

// client.on('guildDelete')
// on these events, add or remove the guild from the db
// on commands that require it, check if the coc credentials were set, if they weren't, send default message
// client.on('guildCreate')

client.login(process.env.TOKEN)

export {
  cocClient,
  keyv,
  i18n
}
