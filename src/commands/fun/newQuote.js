import { ROLE_2TP, CHANNEL_QUOTES, COLOR_PURPLE } from "../../config.js";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import userHasRole from "../../helpers/userHasRole.js";

export default async function newQuote(interaction, client) {
  // Check if user has required role
  if (!userHasRole(interaction, ROLE_2TP))
    return interaction.reply({
      content: `You need the <@&${ROLE_2TP}> role to use this command ❗`,
      ephemeral: true,
    });

  // Command options
  const description = interaction.options.getString("description");
  const footer = interaction.options.getString("author");

  const embedMessage = new EmbedBuilder()
    .setColor(COLOR_PURPLE)
    .setTitle("QUOTE")
    .setDescription(description)
    .setFooter({ text: `- ${footer}` });

  await interaction.reply({ content: "Success ✅", ephemeral: true });

  // Send message to quotes channel
  const quotesChannel = client.channels.cache.get(CHANNEL_QUOTES);
  await quotesChannel.send({ embeds: [embedMessage] });
}

// Slash Builder
export const newQuoteCommand = new SlashCommandBuilder()
  .setName("new-quote")
  .setDescription("Sends an embedded message that represents a quote")
  .addStringOption((option) =>
    option
      .setName("description")
      .setDescription("Description of the quote")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option.setName("author").setDescription("Quoted person").setRequired(true),
  );
