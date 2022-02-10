import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { cocClient } from '../bot'

export default {
	data: new SlashCommandBuilder()
		.setName('war-info')
		.setDescription('Gets the current clan war info')
		.addBooleanOption((option) =>
			option.setName('ephemeral')
				.setDescription('Hides the value for only you to see')),
	async execute(interaction: CommandInteraction) {
		// TODO instead of a global clan tag, create a sqlite db that saves the guild id
		//then fetches the guild id before each interaction required, then it gets that one
		//then the bot will be global and be available with multiple servers
		const ephemeral = interaction.options.getBoolean('ephemeral') ?? false
		const info = await cocClient.getCurrentWar(process.env.CLAN_TAG!)
	}
}
