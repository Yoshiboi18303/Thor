const shell = require("shelljs");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("speedtest")
    .setDescription("Shows how fast the network is on the client"),
  async execute(interaction) {
    if(!admins.includes(interaction.user.id)) return await interaction.reply({ content: "You are **NOT** an owner of the bot!", ephemeral: true })
    await interaction.deferReply();
    var output = shell.exec("speedtest");
    await interaction.editReply({
      content: `\`\`\`\n${output}\n\`\`\``
    })
  }
}