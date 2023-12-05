import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { COLOR_TURQUOISE } from "../../config.js";

// Slash commands
import { pingCommand } from "../../commands/fun/ping.js";
import { newQuoteCommand } from "../../commands/fun/newQuote.js";
import { newPetitionCommand } from "../../commands/fun/newPetition.js";
import { reactionRoleCommand } from "../../commands/fun/reactionRole.js";
import { ludwigQuoteCommand } from "../../commands/fun/ludwigQuote.js";
import { warnCommand } from "../../commands/moderator/warn.js";
import { clearCommand } from "../../commands/moderator/clear.js";

// Slash Builder
export const helpCommand = new SlashCommandBuilder()
   .setName("help")
   .setDescription("Sends an embedded message with interactive buttons");

const commands = [
   pingCommand,
   newQuoteCommand,
   newPetitionCommand,
   reactionRoleCommand,
   ludwigQuoteCommand,
   warnCommand,
   clearCommand,
   helpCommand,
];

export default async function help(interaction, client) {
   const publicCommands = commands.filter(
      (command) => command.default_member_permissions === undefined
   );
   const moderatorCommands = commands.filter(
      (command) => command.default_member_permissions !== undefined
   );

   // Embed message
   const embedMessage = new EmbedBuilder()
      .setColor(COLOR_TURQUOISE)
      .setTitle("HELP ❓")
      .setDescription(
         `
  This bot is made specifically for the **Fungus Inc** server. For more information on commands and usage, read the following 🔽

**Public/requires a role commands: 🌍**
${publicCommands
   .map((command) => `\`/${command.name}\` - ${command.description}`)
   .join("\n")}

**Music bot commands: 🎵**
*Note: Due to an older API codebase I couldn't make these commands be able to be executed by \`/\` like the others, apologies for the inconvenience.*
\`$play\` - Adds a song to the music queue
\`$loop\` - Loops the music queue
\`$stop\` - Stops the music
\`$leave\` - Disconnects the bot from the VC
\`$resume\` - Resumes paused song
\`$pause\` - Pauses the currently playing song
\`$skip\` - Skips the currently playing song
\`$queue\` - Shows a list of the music queue

**Moderator commands: 🔒**
${moderatorCommands
   .map((command) => `\`/${command.name}\` - ${command.description}`)
   .join("\n")}
      `
      )
      .setFooter({
         text: `If you've got more questions or found a bug, you can contact me @muchassak ✌️`,
      });

   // Reply to the command
   await interaction.reply({
      embeds: [embedMessage],
   });
}
