import "dotenv/config";
import axios from "axios";
import { main } from "./utils/index.js"
import { converteTempo } from "./utils/index.js"
import { comparaData } from "./utils/index.js"
import { buscaIdsMatches, buscaPuuid, getApi, buscaMatchesById} from "./service/index.js";
const { DISCORD_BOT_TOKEN, CLIENT_ID, GUILD_ID, THALES_ID, galoNick } = process.env;

import { Client, GatewayIntentBits } from 'discord.js';
import { Events } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.login(DISCORD_BOT_TOKEN);
