import "dotenv/config";
import { SlashCommandBuilder } from "discord.js";
import { REST, Routes } from "discord.js";

const teste = [
  {
    name: "tales",
    description: "Verifica se o tales jogou lol hoje",
  },
  {
    name: "lol",
    description: "Insira o nick e a tag do player e verifique se ele jogou lol hoje",
    options: [
      {
        name: "nick",
        description: "Fale o nick",
        type: 3, // Tipo 3 para parâmetros de string
        required: true,
      },
      {
        name: "tag",
        description: "Fale a tag",
        type: 3, // Tipo 3 para parâmetros de string
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  try {
    console.log("REGISTRAAAAAAAAAAAAAAAAA");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: teste }
    );
    console.log(
      "REGIIIIIIIIIIIIIIIIIIISSSSSSSSSSSSSSSSSSSSSSSSSSTRRRRRRRRRRRROUUUUU"
    );
  } catch (error) {
    console.error(`Deu ruim: ${error}`);
  }
})();
