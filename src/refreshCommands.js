import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import "dotenv/config";

// Slash commands
import { pingCommand } from "./commands/fun/ping.js";
import { newQuoteCommand } from "./commands/fun/newQuote.js";
import { newPetitionCommand } from "./commands/fun/newPetition.js";
import { reactionRoleCommand } from "./commands/fun/reactionRole.js";
import { ludwigQuoteCommand } from "./commands/fun/ludwigQuote.js";
import { warnCommand } from "./commands/moderator/warn.js";
import { clearCommand } from "./commands/moderator/clear.js";
import { helpCommand } from "./commands/help/help.js";

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

const rest = new REST({ version: "10" }).setToken(process.env["TOKEN"]);

(async () => {
   try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(
         Routes.applicationGuildCommands(
            process.env["CLIENT_ID"],
            process.env["GUILD_ID"]
         ),
         {
            body: commands,
         }
      );

      console.log("Successfully reloaded application (/) commands.");
   } catch (err) {
      console.error(err);
   }
})();
