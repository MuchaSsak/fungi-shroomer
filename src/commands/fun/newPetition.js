import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CHANNEL_PETITIONS, COLOR_BLUE } from "../../config.js";

export default async function newPetition(interaction, client) {
  // Command options
  const description = interaction.options.getString("description");

  const embedMessage = new EmbedBuilder()
    .setColor(COLOR_BLUE)
    .setTitle("PETITION")
    .setDescription(description);

  await interaction.reply({ content: "Success ✅", ephemeral: true });

  // Send message to petitions channel
  const petitionsChannel = client.channels.cache.get(CHANNEL_PETITIONS);
  const message = await petitionsChannel.send({ embeds: [embedMessage] });
  message.react("👍");
  message.react("👎");
}

// Slash Builder
export const newPetitionCommand = new SlashCommandBuilder()
  .setName("new-petition")
  .setDescription(
    "Sends an anonymous embedded message that has reaction roles for a voting system",
  )
  .addStringOption((option) =>
    option
      .setName("description")
      .setDescription("Description of the petition")
      .setRequired(true),
  );
