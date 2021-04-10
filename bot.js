const Discord = require("discord.js"); 
const client = new Discord.Client();
const {prefix} = require('./config.json'); 
require('dotenv').config();

const token = process.env.TOKEN;
const apiKey = process.env.API_KEY; 
console.log(token);
console.log(apiKey);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  if (msg.content.startsWith(`${prefix}request`)) {
    console.log(msg.content);
  }
})

client.login(token); 

