const Discord = require("discord.js"); 
const client = new Discord.Client();
const {prefix} = require('./config.json'); 
const axios = require('axios').default;
require('dotenv').config();

const token = process.env.TOKEN;
const apiKey = process.env.API_KEY; 
const tempKey = process.env.TEMP; 
var search = require('youtube-search');

// console.log(token);
// console.log(apiKey);

const {google} = require('googleapis');
const youtubeApi = google.youtube({
  version: "v3",
  auth: `${apiKey}`,
})

const url = 'https://www.googleapis.com/youtube/v3/playlists'; 
const playlistID = 'PLtUHWpjOGp66jtDY5-EDW1fv7FS59WUND';
const playlistURL = 'https://www.youtube.com/playlist?list=PLtUHWpjOGp66jtDY5-EDW1fv7FS59WUND'; 
const channelID = 'UC1Ta0brsoOlOlDrTJXL681A'; 

// var resyoutube = youtubeApi.search.list({part: "hello world"});
// console.log(resyoutube)


//FIREBASE CODE:

const admin = require('firebase-admin');
const db = admin.database();

admin.initializeApp({
  databaseURL: 'https://pickhacks2021-273fd-default-rtdb.firebaseio.com/',
})

async function addToDatabase(songName,songURL){
  try{
    var songRef = db.ref("songs/"+songURL);
    var existingData = await songRef.get();
    var requests = 1;
    if(existingData.exists()){
      requests = existingData.val()["requests"] +1 || 1;
    }
    var d = new Date()
    songRef.set({
      name: songName,
      url: songURL,
      requests: requests,
      time: d.getTime(),
    })

  }catch(e){
    console.log("Firebase Database Error");
    console.log(e);
  }
}

// Bot methods
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", async (msg) => {
  console.log(msg.content);
  if(msg.content.startsWith(`${prefix}request`)){
    var str = msg.content.slice(9);//"!request " is 10 characters

    if(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(str)){
      msg.reply(`Valid Youtube URL: ${str}`);
    }else{
      var opts = {
        maxResults: 10,
        key: apiKey,
        order: 'viewCount',
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
            let videoID = obj.id;
            addToDatabase(obj.title, obj.link);
            msg.reply(`Successfully requested song: \"${obj.title}\". URL: ${obj.link}\nView our playlist here: `);
          }
          
        }
      })
    }
  }
})

client.on('guildMemberAdd', member =>{
  channel = member.guild.channels.cache.get("channel id");
  channel.send("Welcome " + member.displayName + "\n Current # of hackers: " + member.guild.memberCount);
})


client.on('error', error =>{
  channel.send("No noes! Error occurred.\nError code: " + error);
})

client.login(token); 
