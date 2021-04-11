const Discord = require("discord.js"); 
const client = new Discord.Client();
const {prefix} = require('./config.json'); 
const axios = require('axios').default;
const {JWT} = require('google-auth-library'); 

const https = require("https");
require('dotenv').config();

const token = process.env.TOKEN;
const apiKey = process.env.API_KEY; 
const tempKey = process.env.TEMP; 
var search = require('youtube-search');

// console.log(token);
// console.log(apiKey);

const {google} = require('googleapis');
const auth  = new google.auth.GoogleAuth(
  {
    keyFile: './keys.json', 
    scopes: [
    'https://www.googleapis.com/auth/youtubepartner',
    'https://www.googleapis.com/auth/youtube', 
    'https://www.googleapis.com/auth/youtube.force-ssl'
  ]
  }
);
const youtubeApi = google.youtube({
  version: "v3",
  auth: auth,
})

// let keys =  require('./fourkeys.json');
// keys.private_key = keys.private_key.replace(new RegExp("\\\\n", "\g"), "\n");
// console.log(keys.private_key);

// async function main() {
//   const client = new JWT({
//     email: keys.client_email,
//     key: keys.private_key,
//     scopes: ['https://www.googleapis.com/auth/cloud-platform',
//     'https://www.googleapis.com/auth/youtubepartner',
//     'https://www.googleapis.com/auth/youtube', 
//     'https://www.googleapis.com/auth/youtube.force-ssl'],
//   });
//   console.log(keys.project_id);
//   const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
//   const res = await client.request({url});
//   console.log(res.data);
// }

// main().catch(console.error);

const url = 'https://www.googleapis.com/youtube/v3/playlists'; 
const playlistID = 'PLtUHWpjOGp66jtDY5-EDW1fv7FS59WUND';
const playlistURL = 'https://www.youtube.com/playlist?list=PLtUHWpjOGp66jtDY5-EDW1fv7FS59WUND'; 
const channelID = 'UC1Ta0brsoOlOlDrTJXL681A'; 

// var resyoutube = youtubeApi.search.list({part: "hello world"});
// console.log(resyoutube)

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
          console.log(err);
          msg.reply("An Error Occurred");
        }else{
          var arr = results.filter(r=>r.kind=="youtube#video");
          if(results.length==0) msg.reply("No results found!")
          else{
            var obj = arr[0];
            let videoID = obj.id;

            //Start the request to firebase functions:

            const data = JSON.stringify({
              name: obj.title,
              id: obj.id,
            })
            
            const options = {
              hostname: 'us-central1-translationeer.cloudfunctions.net',
              port: 443,
              path: '/app/pickhacks',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
              }
            }
            
            const req = https.request(options, res => {
              console.log(`statusCode: ${res.statusCode}`)
            
              // res.on('data', d => {
              //   process.stdout.write(d)
              // })
            })
            
            req.on('error', error => {
              console.error(error)
            })
            
            req.write(data);
            req.end()
            
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

// axios({
//   method: 'post', 
//   url: url,
//   data: {
//     "snippet": {
//       "playlistId": playlistID,
//       "position": 0,
//       "resourceId": {
//         "kind": "youtube#video",
//         "videoId": "M7FIvfx5J10"
//       }
//     }
//   }
// })
// .then( resp => {
//   console.log(resp.status);
// })
// .catch(err => {
// // //   console.log("Something wrong: "); 
// // // })

// youtubeApi.playlistItems.insert({
//   "part": [
//     "snippet"
//   ],
//   "resource": {
//     "snippet": {
//       "playlistId": playlistID,
//       "position": 0,
//       "resourceId": {
//         "kind": "youtube#video",
//         "videoId": "M7FIvfx5J10"
//       }
//     }
//   }
// })
// .then(function(response) {
//   console.log("Response:", response);
// })
// .catch( function(err) { console.error("Execute error", err); 
// });

// youtubeApi.playlistItems.list({
//   "part": [
//     "snippet,contentDetails"
//   ],
//   "maxResults": 25,
//   "playlistId": "PLBCF2DAC6FFB574DE"z
// })
// .then(function(response) {
//   // Handle the results here (response.result has the parsed body).
//   console.log("Response", response);
// },
// function(err) { console.error("Execute error", err); });