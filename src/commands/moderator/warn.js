import { CHANNEL_ALERTS, COLOR_RED } from "../../config.js";
import {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
} from "discord.js";

export default async function warn(interaction, client) {
  // Command options
  const targettedUser = interaction.options.getUser("target");
  const warnReason = interaction.options.getString("reason");

  const curDate = new Date().toUTCString();

  const alertsChannel = await client.channels.cache.get(CHANNEL_ALERTS);

  // Get target user by ID
  const user = await client.users.fetch(targettedUser.id, false);
  // Embed message to user's DM
  const embedDM = new EmbedBuilder()
    .setColor(COLOR_RED)
    .setTitle("WARN ❗")
    .setDescription(
      `
Hey ${user},

You have been warned in the **Fungus Inc** Discord server. There aren't any sort of punishments for warns themselfs, although next time you might get muted or banned. If you think that the warn is inappropriate, please contact our administration. 🍄

**Reason for warn:** \`${warnReason}\`
    `,
    )
    .setFooter({ text: curDate });

  // Embed message on alerts channel
  const embedAlert = new EmbedBuilder()
    .setColor(COLOR_RED)
    .setTitle("WARN ❗")
    .setDescription(
      `
      The user ${user} has been warned for \`${warnReason}\`
          `,
    )
    .setFooter({ text: curDate });

  user.send({ embeds: [embedDM] });
  await alertsChannel.send({ embeds: [embedAlert] });

  interaction.reply({ content: `Success ✅`, ephemeral: true });
}

// Slash Builder
export const warnCommand = new SlashCommandBuilder()
  .setName("warn")
  .setDescription("Warns the specified user and possibly timeouts/bans.")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("The desired user to be warned")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("reason")
      .setDescription("The reason of the warn")
      .setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);
