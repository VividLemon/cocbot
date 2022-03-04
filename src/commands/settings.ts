import { SlashCommandBuilder } from '@discordjs/builders'
import { ClanDetails } from 'cocbot'
import { CommandInteraction } from 'discord.js'
import { i18n, keyv } from '../bot'

export default {
  data: new SlashCommandBuilder()
    .setName('clan-settings')
    .setDescription('Settings for the owner to configure their server')
    .addStringOption((option) =>
      option.setName('clan-tag')
        .setDescription('Your clans clantag beginning with #')
        .setRequired(true))
    .addRoleOption((option) =>
      option.setName('member-role')
        .setDescription('Set the default role after someone authenticates')
        .setRequired(true))
    .addRoleOption((option) =>
      option.setName('elder-role')
        .setDescription('Set the default role for clan authenticated elders')
        .setRequired(true))
    .addRoleOption((option) =>
      option.setName('co-owner-role')
        .setDescription('Set the default role for clan authenticated co-owners')
        .setRequired(true)),
  async execute (interaction: CommandInteraction): Promise<void> {
    const clanTag = interaction.options.getString('clan-tag')!
    const memberRole = interaction.options.getRole('member-role')!
    const elderRole = interaction.options.getRole('elder-role')!
    const coRole = interaction.options.getRole('co-owner-role')!
    if (interaction.guild == null) {
      return await interaction.reply({ content: `${i18n.__('unableToGetServer')}, ${i18n.__('unexpectedIssue')}`, ephemeral: true })
    }
    if (interaction.user.id !== interaction.guild.ownerId) {
      return await interaction.reply({ content: i18n.__('noAccessToCommand'), ephemeral: true })
    }
    const clan: ClanDetails = {
      clanTag,
      memberRoleId: memberRole.id,
      elderRoleId: elderRole.id,
      coRoleId: coRole.id
    }
    await keyv.set(interaction.guild.id, clan)
    await interaction.reply({ content: i18n.__('settingsSet'), ephemeral: true })
  }
}
