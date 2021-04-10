const Discord = require("discord.js"); 
const client = new Discord.Client();
const {prefix} = require('./config.json'); 
require('dotenv').config();

const token = process.env.TOKEN;
const apiKey = process.env.API_KEY; 
var search = require('youtube-search');

console.log(token);
console.log(apiKey);

const {google} = require('googleapis');
const youtubeApi = google.youtube({
  version: "v3",
  auth: "AIzaSyDKkkKM32mBBk8z3TSE3Orr4-IgYOAOkHQ",
})

// var resyoutube = youtubeApi.search.list({part: "hello world"});
// console.log(resyoutube)

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", async (msg) => {
  console.log(msg.content);
  if(msg.content.startsWith(`${prefix}request`)){
    console.log("REQUESTING!")
    var str = msg.content.slice(9);//"!request " is 10 characters
    console.log(str); 

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
          msg.reply("An Error Occurred");
        }else{
          var arr = results.filter(r=>r.kind=="youtube#video");
          if(results.length==0) msg.reply("No results found!")
          else{
            var obj = arr[0];
            msg.reply(`Successfully requested song: \"${obj.title}\". URL: ${obj.link}`)
          }
          
        }
      })
    }
  }

  if (msg.content.startsWith(`${prefix}request`)) {
    console.log(msg.content);
  }

  // else{
  //   msg.reply("Use the \"!request\" command, followed by a youtube URL to add a song to the playlist!")
  // }
})

client.login(token); 

