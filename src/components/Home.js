import { useEffect, useState } from "react"

export default function Home(){
    const [playlist,setPlaylist] = useState([]);


    useEffect(()=>{
        fetch("/playlist").then(data=>{
            console.log(data);
            return data.json()
        }).then(data=>{
            console.log(data);
            setPlaylist(data["playlist"]);
        })
    })


    return <div>
        <main>
            <section id="left-side">
                <h2>Currently Playing:</h2>
                <div>
                    <div>
                        
                    </div>               
                </div>
            </section>
            <section id="right-side">
                <h2>Playlist</h2>
                <ul>
                    {playlist.map(song=>{
                        return <li>
                            <h4>{song.name||"Untitled Song"}</h4>
                        </li>
                    })}
                </ul>
            </section>
        </main>
    </div>
}