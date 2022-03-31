const keepAlive = require("../keepAlive")

module.exports = {
  name: "ready",
  once: false,
  async execute(client) {
    var username = `${client.user.username}`.rainbow
    var activities = [`${client.guilds.cache.get("833671287381032970").name}`, `${client.users.cache.size} users`, `Coded by ${client.users.cache.get("697414293712273408").username}`]
    var types = ["PLAYING", "LISTENING", "WATCHING"]
    setInterval(() => {
      var activity = activities[Math.floor(Math.random() * activities.length)]
      var type = types[Math.floor(Math.random() * types.length)]
      client.user.setActivity(activity, {
        type,
      })
    }, 15000)
    client.stats.on("autopost-start", () => {
      console.log(`Autoposting for ${username} has started!`)
    })
    client.stats.autopost();
    client.stats.on("post", status => {
      // status = false if the post was successful
      // status = "Error message" or status = Error if there was an error
      if (!status) console.log(`${`Successful post!`.green}`);
      else console.error(`${`${status}`.red}`);
    });
    keepAlive(client);
    console.log(`${username} has logged on!`)
  }
}