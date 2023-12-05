import { SlashCommandBuilder } from "discord.js";

export default function ping(interaction) {
  interaction.reply("Pong!");
}

// Command Builder
export const pingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with pong!");
