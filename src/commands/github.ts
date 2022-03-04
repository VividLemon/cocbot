import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('github')
    .setDescription('Sends the Github repository URL which contains information on how to use'),
  async execute (interaction: CommandInteraction): Promise<void> {
    await interaction.reply({ content: 'https://github.com/kwiksilver3441/cocbot', ephemeral: true })
  }
}
