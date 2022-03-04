import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, MessageAttachment } from 'discord.js'
import { unlink } from 'fs/promises'
import { cocClient, i18n } from '../bot'
import buildTempFile from '../util/buildTempFile'

export default {
  data: new SlashCommandBuilder()
    .setName('leagues-info')
    .setDescription('Gets the global war leagues info')
    .addBooleanOption((option) =>
      option.setName('ephemeral')
        .setDescription('Hides the value for only you to see')),
  async execute (interaction: CommandInteraction): Promise<void> {
    const ephemeral = interaction.options.getBoolean('ephemeral') ?? false
    const info = await cocClient.getWarLeagues()
    if (info == null) {
      return await interaction.reply({ content: i18n.__('noWarLeagueInfo'), ephemeral: true })
    }
    const file = await buildTempFile(JSON.stringify(info, null, 2))
    const mFile = new MessageAttachment(file)
    await interaction.reply({ content: i18n.__('warLeagueInfo'), ephemeral, attachments: [mFile] })
    unlink(file)
      .catch((error) => {
        console.error({ error, interaction })
      })
  }
}
