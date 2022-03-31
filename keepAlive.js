const express = require("express")
const app = express();
const port = process.env.PORT || 3000;
const { Client } = require("discord.js");

/**
  * @param {Client} client
*/
function keepAlive(client) {
  if(!(client instanceof Client)) throw new Error("The client needs to be a discord.js Client!")
  app.get("/", (req, res) => {
    res.status(200).send("Hosting is working (real website coming soon)!")
  })

  app.listen(port)

  console.log(`${`${client.user.username}`.rainbow} hosting is now listening on port ${port}!`)
}

module.exports = keepAlive;