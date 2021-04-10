const Discord = require("discord.js"); 
const client = new Discord.Client();
require('dotenv').config();

const https = require('https')
var search = require('youtube-search');


const {google} = require('googleapis');
const youtubeApi = google.youtube({
  version: "v3",
  auth: "AIzaSyDKkkKM32mBBk8z3TSE3Orr4-IgYOAOkHQ",
})

console.log(process.env.TOKEN);


// var resyoutube = youtubeApi.search.list({part: "hello world"});
// console.log(resyoutube)

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", async (msg) => {
  console.log(msg.content);
  if(/^!request /.test(msg.content)){
    console.log("REQUESTING!")
    var str = msg.content.slice(9);//"!request " is 10 characters
    if(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(str)){
      msg.reply(`Valid Youtube URL: ${str}`);
    }else{
      var opts = {
        maxResults: 10,
        key: 'AIzaSyDKkkKM32mBBk8z3TSE3Orr4-IgYOAOkHQ',
        part: "snippet"
      }

      search(str,opts,(err,results)=>{
        if(err){
          console.log(err);
          msg.reply("An Error Occurred");
        }else{
          console.log(results);
        }
      })
    }
  }else{
    msg.reply("Use the \"!request\" command, followed by a youtube URL to add a song to the playlist!")
  }
})
  
client.login(process.env.TOKEN); 
