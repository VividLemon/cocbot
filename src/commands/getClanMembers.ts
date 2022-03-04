import { SlashCommandBuilder } from '@discordjs/builders'
import { ClanDetails } from 'cocbot'
import { CommandInteraction, MessageAttachment } from 'discord.js'
import { unlink } from 'fs/promises'
import { cocClient, i18n, keyv } from '../bot'
import buildTempFile from '../util/buildTempFile'

export default {
  data: new SlashCommandBuilder()
    .setName('clan-members')
    .setDescription('Gets the current clan members list')
    .addBooleanOption((option) =>
      option.setName('ephemeral')
        .setDescription('Hides the value for only you to see'))
    .addStringOption((option) =>
      option.setName('clan-tag')
        .setDescription('Allows you to search any clan tag\'s current war. Otherwise server defaults'))
    .addBooleanOption((option) =>
      option.setName('ephemeral')
        .setDescription('Hides the value for only you to see')),
  async execute (interaction: CommandInteraction): Promise<void> {
    const clanTag = interaction.options.getString('clan-tag') ?? (interaction.guild == null) ? undefined : (await keyv.get(interaction.guild.id) as ClanDetails).clanTag
    if (clanTag == null) {
      return await interaction.reply({ content: i18n.__('unableToGetServerClanAndOptNotSet'), ephemeral: true })
    }
    const ephemeral = interaction.options.getBoolean('ephemeral') ?? false
    const info = await cocClient.getClanMembers(clanTag)
    if (info == null) {
      return await interaction.reply({ content: i18n.__('noClanMembersInfo', { tag: clanTag }), ephemeral: true })
    }
    const file = await buildTempFile(JSON.stringify(info, null, 2))
    const mFile = new MessageAttachment(file)
    await interaction.reply({ content: i18n.__('clanMembersInfo', { tag: clanTag }), ephemeral, attachments: [mFile] })
    unlink(file)
      .catch((error) => {
        console.error({ error, interaction })
      })
  }
}
