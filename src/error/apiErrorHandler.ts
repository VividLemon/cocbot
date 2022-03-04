import { ButtonInteraction, CacheType, CommandInteraction } from 'discord.js'
import { ApiError } from '.'
import { i18n } from '../bot'

export default async (error: any, interaction: CommandInteraction<CacheType> | ButtonInteraction<CacheType>): Promise<void> => {
  console.error({ error, interaction })
  if (error instanceof ApiError) {
    return await interaction.reply({ content: error.message, ephemeral: true })
  }
  return await interaction.reply({ content: `${i18n.__('unexpectedIssue')}. ${i18n.__('errorWasLogged')}`, ephemeral: true })
}
