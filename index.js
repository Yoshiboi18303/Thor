const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
  intents: Object.values(Intents.FLAGS),
  allowedMentions: {
    parse: ["users", "roles"],
  },
  shards: "auto",
});
const token = process.env.TOKEN;
const { Client: C } = require("statcord.js");
const statcord = new C({
  client,
  key: process.env.STATCORD_KEY,
  postCpuStatistics: true,
  postMemStatistics: true,
  postNetworkStatistics: true,
});

global.client = client;
global.fs = require("fs");
global.colors = require("./colors.json");
global.ms = require("ms");
global.admins = ["697414293712273408"]

client.commands = new Collection();
client.events = new Collection();
client.stats = statcord;

const functions = fs
  .readdirSync("./functions/")
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync("./events/")
  .filter((file) => file.endsWith(".js"));
const commandFolder = fs.readdirSync("./commands/");

(async () => {
  for (const file of functions) {
    require(`./functions/${file}`)(client);
  }

  client.handleEvents(eventFiles, "./events");
  client.handleCommands(commandFolder, "./commands");
  client.login(token);
})();
