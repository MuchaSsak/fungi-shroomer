import { ROLE_2TP, COLOR_YELLOW } from "../../config.js";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import userHasRole from "../../helpers/userHasRole.js";
import fetch from "node-fetch";

export default async function ludwigQuote(interaction, client) {
   // Check if user has required role
   if (!userHasRole(interaction, ROLE_2TP))
      return interaction.reply({
         content: `You need the <@&${ROLE_2TP}> role to use this command ❗`,
         ephemeral: true,
      });

   // Fetch data from Ludwig Quotes API
   let quoteData;
   try {
      const res = await fetch(`https://ludwig-quotes-api.vercel.app/quote`);

      if (res.success === false)
         throw new Error(`Something went wrong with fetching (${res.status})`);

      const data = await res.json();

      quoteData = data.data;
   } catch (err) {
      return console.error(err);
   }

   const embedMessage = new EmbedBuilder()
      .setColor(COLOR_YELLOW)
      .setTitle("LUDWIG QUOTE")
      .setDescription(quoteData.quote)
      .setFooter({ text: `#${quoteData.num}` });

   interaction.reply({ embeds: [embedMessage] });
}

// Slash Builder
export const ludwigQuoteCommand = new SlashCommandBuilder()
   .setName("ludwig-quote")
   .setDescription("Gets a random Ludwig quote. Cheers from Beton.");
