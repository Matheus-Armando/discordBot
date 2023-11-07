import "dotenv/config";
const { DISCORD_BOT_TOKEN, CLIENT_ID, GUILD_ID, THALES_ID, galoNick } =
  process.env;
import { main, mainTales } from "./utils/index.js";
import { Client, GatewayIntentBits, IntentsBitField } from "discord.js";
import { Events } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, async (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "tales") {
    try {
      interaction.reply("Espere o client de bosta responder");
      interaction.followUp(await mainTales());
    } catch (error) {
      console.log(error);
    }
  }
 
  if (interaction.commandName === "teste") {
    try {
      interaction.reply("Espere o client de bosta responder");
      const name = interaction.options.getString("nick");
      const tag = interaction.options.getString("tag");
      interaction.followUp(await main(name, tag));
    } catch (error) {
      console.log(error);
    }
  }
});

client.login(DISCORD_BOT_TOKEN);
