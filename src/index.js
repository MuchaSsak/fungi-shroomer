// Command functions
import ping from "./commands/fun/ping.js";
import newQuote from "./commands/fun/newQuote.js";
import newPetition from "./commands/fun/newPetition.js";
import reactionRole from "./commands/fun/reactionRole.js";
import ludwigQuote from "./commands/fun/ludwigQuote.js";
import clear from "./commands/moderator/clear.js";
import warn from "./commands/moderator/warn.js";
import help from "./commands/help/help.js";

import { CHANNEL_WELCOME, COLOR_TURQUOISE } from "./config.js";
import distubeInit from "./commands/music/DisTube.js";

import {
   Client,
   GatewayIntentBits,
   ActivityType,
   EmbedBuilder,
} from "discord.js";
import "dotenv/config";
import "sodium";
import keepAlive from "./server.js";

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildModeration,
      GatewayIntentBits.MessageContent,
   ],
});

client.on("ready", () => {
   console.log(`Logged in as ${client.user.tag}!`);

   // DisTube music
   distubeInit(client);

   // Set status
   client.user.setActivity({
      name: "/help 🍄",
      type: ActivityType.Playing,
   });
});
keepAlive();
client.login(process.env["TOKEN"]);

// Check for specific slash commands
client.on("interactionCreate", async (interaction) => {
   if (!interaction.isCommand()) return;

   switch (interaction.commandName) {
      case "ping":
         ping(interaction);
         break;
      case "new-quote":
         newQuote(interaction, client);
         break;
      case "new-petition":
         newPetition(interaction, client);
         break;
      case "reaction-role":
         reactionRole(interaction, client);
         break;
      case "ludwig-quote":
         ludwigQuote(interaction, client);
         break;
      case "warn":
         warn(interaction, client);
         break;
      case "clear":
         clear(interaction, client);
         break;
      case "help":
         help(interaction, client);
         break;
   }
});

// Welcome users
client.on("guildMemberAdd", (member) => {
   const welcomeChannel = client.channels.cache.get(CHANNEL_WELCOME);

   const embedMessage = new EmbedBuilder()
      .setColor(COLOR_TURQUOISE)
      .setTitle("A new little fungi has appeared! 😊")
      .setDescription(
         `
    Welcome ${member}! 🍄
        `
      );

   welcomeChannel.send({ embeds: [embedMessage] });
});
