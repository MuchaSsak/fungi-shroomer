import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default function clear(interaction) {
  // Command options
  const amount = interaction.options.getNumber("amount");

  if (amount > 100)
    return interaction.reply({
      content: "The amount should be less than or equal to 100 ❗",
      ephemeral: true,
    });

  interaction.channel.bulkDelete(amount, true);
  interaction.reply({ content: "Success ✅", ephemeral: true });
}

// Slash Builder
export const clearCommand = new SlashCommandBuilder()
  .setName("clear")
  .setDescription(
    "Clears the provided amount of messages last sent in the current channel",
  )
  .addNumberOption((option) =>
    option
      .setName("amount")
      .setDescription("The amount of messages to be cleared")
      .setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);
