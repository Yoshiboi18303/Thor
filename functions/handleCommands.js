const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client } = require("discord.js");

/**
 * @param {Client} client
 */
module.exports = (client) => {
  client.commandArray = [];
  client.handleCommands = async (commandFolders, path) => {
    for (folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`${path}/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);

        if (!command.data.name || typeof command.data.name == "undefined")
          throw new Error("Thor Error > All commands require a name!");
        if (typeof command.data.name != "string")
          throw new TypeError(
            "Thor TypeError > Your command name needs to be a string!"
          );

        if (
          !command.data.description ||
          typeof command.data.description == "undefined"
        )
          throw new Error("Thor Error > All commands require a description!");
        if (typeof command.data.description != "string")
          throw new TypeError(
            "Thor TypeError > Your command description needs to be a string!"
          );

        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

    (async () => {
      try {
        const clientID = client.ready ? client.user.id : "958911375260917790";
        const guildID = "833671287381032970";
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
          body: client.commandArray,
        });

        console.log(
          "Successfully reloaded application (/) commands.\nBot functions successfully made and completed!"
        );
        console.log(
          "\n--------------------------------------------------------------\n"
        );
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
