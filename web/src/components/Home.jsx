import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

export default function Home() {

    const [openGenre, setOpenGenre] = useState(false);
    const [openAuthor, setOpenAuthor] = useState(false);
    const [manga, setMangas] = useState([]);

    const fetchManga = () => {
        fetch("http://localhost:3000/manga")
            .then(res => res.json())
            .then((jsonData) => {
                console.log(manga)
                setMangas(jsonData);
            })
    }

    useEffect(() => {

        fetchManga();

    }, []);

    return (
        <>
            <header className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center"> Jao's Manga</header>
            
            <container className="grid grid-cols-4 min-h-screen pt-10">

                <filter className="col-span-1">
                    <h1 className="text-center text-5xl pb-10">Filter</h1>
                    <div className="border-b pb-2 max-w-[50%]">
                        <button className="flex justify-between hover:bg-gray-300 text-2xl" onClick={() => setOpenGenre(!openGenre)}>
                            Genre
                            <FontAwesomeIcon icon={openGenre ? faChevronUp : faChevronDown} />
                        </button>
                        {openGenre && (
                            <div className="mt-2 transition-all">
                                <label className="text-xl flex items-center gap-2">
                                    <input type="checkbox" name="genre" value="shonen" />
                                    Shonen
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="border-b pb-2 max-w-[50%]">
                        <button className="flex justify-between hover:bg-gray-300 text-2xl" onClick={() => setOpenAuthor(!openAuthor)}>
                            Author
                            <FontAwesomeIcon icon={openAuthor ? faChevronUp : faChevronDown} />
                        </button>
                        {openAuthor && (
                            <div className="mt-2 transition-all">
                                <label className="text-xl flex items-center gap-2">
                                    <input type="checkbox" name="genre" value="shonen" />
                                    Tite Kubo
                                </label>
                            </div>
                        )}
                    </div>
                </filter>


                {manga.map(manga => {
                    return (
                        <>
                            <div key={manga.id}>
                                <list className="col-span-3">
                                <p className="text-left">Manga</p>
                                    <img src={`http://localhost:3000/images/${manga.image_name}`} />
                                    <h4>{manga.name}</h4>
                                    <p>{manga.author}</p>
                                    <p>{manga.genre}</p>
                                   <button className="border bg-gray-400"><Link to={`/manga/${manga.id}`}>View</Link></button> 
                                </list>
                            </div>
                        </>
                    )
                })
                }
            </container>

            <footer className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center text-center">Copyright 2025</footer>
        </>
    )
}