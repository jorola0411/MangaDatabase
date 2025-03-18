import { useState, useEffect } from "react";
import { Link } from "react-router";
import Filter from "./Filter";
export default function Home() {

    const [manga, setMangas] = useState([]);

    const fetchManga = () => {
        fetch("http://localhost:3000/manga")
            .then(res => res.json())
            .then((jsonData) => {
                setMangas(jsonData);
            })
    }

    useEffect(() => {

        fetchManga();

    }, []);

    return (
        <>
            <header className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center"> Jao's Manga</header>
            
            <container className="grid grid-cols-4 min-h-screen max-w-[1200px] w-full mx-auto my-0 px-4 py-0 mt-10">

               <Filter updateManga={setMangas} ></Filter>


               <list className="col-span-3">
                <div className="flex space-between items-center">
                    <h1 className="text-5xl"> Manga</h1> 
                </div>
                {manga.map(manga => {
                    return (
                        <>
                            <div key={manga.id}>
                         
                                    <img src={`http://localhost:3000/images/${manga.image_name}`} />
                                    <h4>{manga.name}</h4>
                                    <p>{manga.author}</p>
                                    <p>{manga.genre}</p>
                                   <button className="border bg-gray-400"><Link to={`/manga/${manga.id}`}>View</Link></button> 
                                
                            </div>
                     
                            
                        </>
                    )
                })
                }
                </list>
            </container>

            <footer className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center text-center">Copyright 2025</footer>
        </>
    )
}