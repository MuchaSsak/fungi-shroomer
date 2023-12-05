export default function userHasRole(interaction, roleID) {
  const currentMember = interaction.guild.members.cache.get(
    interaction.user.id,
  );
  const memberRoles = currentMember.roles.cache.map((role) => role.id);

  return memberRoles.includes(roleID) ? true : false;
}
