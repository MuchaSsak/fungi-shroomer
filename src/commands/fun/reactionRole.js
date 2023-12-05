import {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  ComponentType,
  PermissionFlagsBits,
} from "discord.js";

export default async function reactionRole(interaction, client) {
  // Command options
  const labels = interaction.options
    .getString("labels")
    .split(",")
    .map((l) => l.trim().toLowerCase());
  const roles = interaction.options
    .getString("roles")
    .split(",")
    .map((r) => r.trim().toLowerCase());
  const descriptions = interaction.options
    .getString("descriptions")
    ?.split(",");

  // Early return if wrong inputs provided
  if (labels.length !== roles.length)
    return interaction.reply({
      content: "There must be the same amount of labels as roles! 😡",
      ephemeral: true,
    });

  // Select menu component
  const select = new StringSelectMenuBuilder()
    .setCustomId("rr")
    .setPlaceholder(
      `Select up to ${labels.length} ${
        labels.length === 1 ? "role" : "roles"
      }!`,
    )
    .setMinValues(0)
    .setMaxValues(labels.length)
    .addOptions(
      ...labels.map((label, i) => {
        // Create option
        const menuOption = new StringSelectMenuOptionBuilder()
          .setLabel(label)
          .setValue(roles[i]);

        // Set description if available
        if (descriptions && descriptions[i])
          menuOption.setDescription(descriptions[i]);

        return menuOption;
      }),
    );

  const row = new ActionRowBuilder().addComponents(select);

  // Send in current channel
  const curChannel = client.channels.cache.get(interaction.channel.id);
  const rrMessage = await curChannel.send({
    components: [row],
  });
  const rrListener = rrMessage.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    time: 3_600_000,
  });

  // Listen for selection of options in the menu
  rrListener.on("collect", async (val) => {
    val.deferUpdate();

    try {
      const selectedRoles = interaction.guild.roles.cache.filter((role) =>
        val.values.includes(role.name.toLowerCase()),
      );

      if ([...selectedRoles].length !== val.values.length)
        throw new Error("Couldn't find all of the roles ❗");

      await interaction.guild.members.cache
        .get(val.user.id)
        .roles.add(selectedRoles);
    } catch (err) {
      console.error(err);
    }
  });

  interaction.reply({ content: "Success ✅", ephemeral: true });
}

export const reactionRoleCommand = new SlashCommandBuilder()
  .setName("reaction-role")
  .setDescription("Creates a menu component with reaction roles!")
  .addStringOption((option) =>
    option
      .setName("labels")
      .setDescription("The labels of the options (seperated by commas)")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("roles")
      .setDescription(
        "Name of the roles that will be given on reaction (seperated by commas)",
      )
      .setRequired(true),
  )
  .addStringOption((option) =>
    option.setName("descriptions").setDescription("Description of the option"),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);
