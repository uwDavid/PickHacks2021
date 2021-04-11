import { useEffect, useState } from "react"
import { database, pFirestore } from "../services/config";

export default function Home(){
    const [playlist,setPlaylist] = useState([]);
    const [times,setTimes] = useState([]);
    const colors = ["var(--pink-color)","var(--blue-color)","var(--yellow-color)"]


    useEffect(()=>{
        // fetch("/playlist").then(data=>{
        //     console.log(data);
        //     return data.json()
        // }).then(data=>{
        //     console.log(data);
        //     setPlaylist(data["playlist"]);
        // })
        // var songsRef = database.ref("songs");
        // songsRef.on('value', (snapshot) => {
        //     const data = snapshot.val();
        //     console.log(data);
        //   });
        pFirestore.collection("pickhacks").orderBy("time","desc").limit(10).onSnapshot(snap=>{
            var arr = [];
            snap.docs.forEach(s=>arr.push(s.data()))
            setPlaylist(arr);
            console.log(arr);
        })

        // setInterval(()=>{
        //     var arr = ["hi"];
        //     console.log(playlist.length)
        //     playlist.forEach(song=>{
        //         var d= new Date();
        //         var time = song.time || d.getTime();
        //         var num = Math.round((d.getTime() -time)/60000); // in minutes
        //         if(num>525600){ // a year
        //             var years = Math.round(num/525600);
        //             arr.push(years+ " yr");
        //         }else if(num>10080){ // a week
        //             var weeks = Math.round(num/10080);
        //             arr.push(weeks+ " wk")
        //         }else if(num>1440){
        //             var days = Math.round(num/1440);
        //             arr.push(days + " dys")
        //         }else if(num>60){
        //             var hours = Math.round(num/60);
        //             arr.push(hours + " hr");
        //         }else{
        //             arr.push(num+" min");
        //         }
        //         arr.push("hello");
        //     })
        //     console.log(arr)
        //     setTimes([...arr]);
        // },1000)
        
    },[])
    console.log(times);
    return <div>
        <main>
            <section id="left-side">
                <section id="jumbotron">
                    <div id="j-image-container"><img src="./../images/djicon.png" id="j-image"></img></div>
                    <div id="j-right">
                        <h2 id="j-text">Join In the Fun!</h2>
                    </div>
                </section>
                <section id="second-section"><p>Playlist made by YOU, the PickHacks Community!</p></section>
                <section id="discord-header"><div id="discord-logo" ></div><div id="discord-title"><h3>Use Our Discord Bot</h3><p>"!request" a song, and it will show up live!</p></div></section>
                <section id="animated-typing"><div><p>{"!request Despacito"}</p></div></section>
                <section style={{display: "flex", justifyContent: "center"}}>
                    <a id="server-join" href="https://discord.com/channels/830277131518214216/830277131984568361/830809509684445214" target="_blank"><div id="discordlogo-small"></div>Join the Discord Server</a>
                </section>
            </section>
            <section id="right-side">
                <h2><div id="live-text"><span></span>Live</div>Playlist</h2>
                <ul className="all-songs">
                    {(()=>{
                        var lis = [];
                        console.log(playlist.length);
                        console.log(playlist)
                        for(let i = 0;i<playlist.length;i++){
                            let song = playlist[i];
                            var d= new Date();
                            var timeDisplay = "";
                var time = song.time || d.getTime();
                var num = Math.round((d.getTime() -time)/60000); // in minutes
                if(num>525600){ // a year
                    var years = Math.round(num/525600);
                    timeDisplay = years+ " yr";
                }else if(num>10080){ // a week
                    var weeks = Math.round(num/10080);
                    timeDisplay= weeks+ " wk";
                }else if(num>1440){
                    var days = Math.round(num/1440);
                    timeDisplay =  days + " dys";
                }else if(num>60){
                    var hours = Math.round(num/60);
                    timeDisplay = hours + " hr";
                }else{
                    timeDisplay = num+" min";
                }
                            lis.push(
                                <li>
                            <h4>{song.songName||"Untitled Song"}</h4>
                            <a href={`https://www.youtube.com/watch?v=${song.songId}`} target="_blank">Listen Now <span>{">>>"}</span></a>
                            <div className="timestamp" style={{
                                backgroundColor: colors[Math.floor(Math.random()*colors.length)],
                                transform: `translate(-50%,-50%) rotateZ(${10-Math.random()*20}deg)`
                            }}>{`${timeDisplay} ago`}</div>
                        </li>
                            )
                        }
                        console.log(lis);
                        return lis;
                    })()}
                    
                </ul>
            </section>
        </main>
    </div>
}