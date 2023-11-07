import "dotenv/config";
const { DISCORD_BOT_TOKEN, CLIENT_ID, GUILD_ID, THALES_ID, galoNick } = process.env;
import { main } from "./utils/index.js";
import { Client, GatewayIntentBits, IntentsBitField } from 'discord.js';
import { Events } from 'discord.js';


const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ] });

client.once(Events.ClientReady, async c => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if(!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping'){
  try {
    interaction.reply("sera que vai?");
    interaction.followUp(await main());}
      
   catch (error) {
    console.log(error);
  }
}
});    


client.login(DISCORD_BOT_TOKEN);
