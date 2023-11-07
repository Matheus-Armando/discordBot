import "dotenv/config";
import { SlashCommandBuilder } from "discord.js";
import { REST, Routes } from "discord.js";

 const teste = [{
    name: 'ping',
    description: 'Replies with Pong!'
  },
 ];

const rest = new REST({version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log('REGISTRAAAAAAAAAAAAAAAAA');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: teste},
      )
      console.log('REGIIIIIIIIIIIIIIIIIIISSSSSSSSSSSSSSSSSSSSSSSSSSTRRRRRRRRRRRROUUUUU')
  } catch (error) { 
    console.error(`Deu ruim: ${error}`);
  }
})();