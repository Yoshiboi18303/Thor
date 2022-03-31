const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("This is the first command of the bot!"),
  async execute(interaction) {
    await interaction.reply({ content: "Test" })
  }
}