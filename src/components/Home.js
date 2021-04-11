import { useEffect, useState } from "react"
import { database, pFirestore } from "../services/config";

export default function Home(){
    const [playlist,setPlaylist] = useState([]);


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
    },[])


    return <div>
        <main>
            <section id="left-side">
                
            </section>
            <section id="right-side">
                <h2>Playlist</h2>
                <ul className="all-songs">
                    {playlist.map(song=>{
                        return <li>
                            <h4>{song.songName||"Untitled Song"}</h4>
                            <a href={`https://www.youtube.com/watch?v=${song.songId}`} target="_blank">Listen Now <span>{">>>"}</span></a>
                        </li>
                    })}
                </ul>
            </section>
        </main>
    </div>
}