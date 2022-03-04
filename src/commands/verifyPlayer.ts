import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { cocClient, i18n, keyv } from '../bot'
import { ClanDetails } from 'cocbot'

export default {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verifies the player to insure they are in the clan')
    .addStringOption((option) =>
      option.setName('player-tag')
        .setDescription('The player tag')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('token')
        .setDescription('A unique verification token located in settings. Does *not* access account!')
        .setRequired(true)),
  async execute (interaction: CommandInteraction) {
    const playerTag = interaction.options.getString('player-tag')!
    const token = interaction.options.getString('token')!

    if (interaction.guild == null) {
      return await interaction.reply({ content: `${i18n.__('unableToGetServer')}, ${i18n.__('unexpectedIssue')}`, ephemeral: true })
    }
    const guild: ClanDetails | undefined = await keyv.get(interaction.guild.id)
    if (guild == null) {
      return await interaction.reply({ content: `${i18n.__('settingsNotSet')} @<${interaction.guild.ownerId} ${i18n.__('settingsNotSetToSetThem')}`, ephemeral: true })
    }

    const verified = await cocClient.verifyPlayerToken(playerTag, token, { retryLimit: 1 })
    if (verified === false) {
      return await interaction.reply({ content: i18n.__('incorrectAuthDetails'), ephemeral: true })
    }
    const player = await cocClient.getPlayer(playerTag)
    const tag = player.clan?.tag
    if (tag == null) {
      return await interaction.reply({ content: i18n.__('notInClan'), ephemeral: true })
    }
    if (tag !== guild.clanTag) {
      return await interaction.reply({ content: i18n.__('notInServerClan'), ephemeral: true })
    }
    const roles = interaction.member?.roles
    if (roles == null || Array.isArray(roles)) {
      return await interaction.reply({ content: `${i18n.__('cannotApplyRoles')}. ${i18n.__('unexpectedIssue')}`, ephemeral: true })
    }

    if (player.role === 'member') {
      const role = interaction.guild.roles.cache.get(guild.elderRoleId)
      if (role == null) {
        return await interaction.reply({ content: `${i18n.__('memberRoleNotFound')} @<${interaction.guild.ownerId}> ${i18n.__('toFixThem')}`, ephemeral: true })
      }
      roles.add(role)
    } else if (player.role === 'elder') {
      const role = interaction.guild.roles.cache.get(guild.elderRoleId)
      if (role == null) {
        return await interaction.reply({ content: `${i18n.__('elderRoleNotFound')} @<${interaction.guild.ownerId}> ${i18n.__('toFixThem')}`, ephemeral: true })
      }
      roles.add(role)
    } else if (player.role === 'coLeader') {
      const role = interaction.guild.roles.cache.get(guild.elderRoleId)
      if (role == null) {
        return await interaction.reply({ content: `${i18n.__('coNotFound')} @<${interaction.guild.ownerId}> ${i18n.__('toFixThem')}`, ephemeral: true })
      }
      roles.add(role)
    } else {
      return await interaction.reply({ content: i18n.__('noRoleInClanError'), ephemeral: true })
    }
    await interaction.reply({ content: `${i18n.__('success')}! ${i18n.__('hasAuthenticated')}`, ephemeral: true })
  }
}
