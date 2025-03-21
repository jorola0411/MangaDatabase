import { useState, useEffect } from "react";
import { Link } from "react-router";
import Filter from "./Filter";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
export default function Home() {

    const [manga, setMangas] = useState([]);

    const fetchManga = async () => {
        fetch("http://localhost:3000/manga")
            .then(response => response.json())
            .then((jsonData) => {
                setMangas(jsonData);
            })
    }

    useEffect(() => {

        fetchManga();

    }, []);

    return (
        <>
            <header className="bg-gray-800 text-white text-3xl p-4 flex flex-col md:flex-row md:justify-center items-center"> Jao's Manga</header>

            <div className="grid grid-cols-4 min-h-screen max-w-[1200px] w-full mx-auto my-0 px-4 py-0 mt-10">

                <Filter updateManga={setMangas} ></Filter>


                <div className="col-span-3">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-5xl ">Manga</h1>
                        <AddModal onMangaAdded={fetchManga} />
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        {manga.map(manga => {
                            return (
                                <div key={manga.id}>
                                    <div className="col-span-1 bg-white border">
                                        <img src={`http://localhost:3000/images/${manga.image_name}`} />
                                        <div className="p-2">
                                            <h4 className="text-3xl">{manga.name}</h4>
                                            <p className="text-xl">{manga.author}</p>
                                            <p className="text-lg">{manga.genre}</p>
                                        
                                            <div className="flex gap-1">
                                                <button className="border bg-gray-800 p-1 hover:bg-green-500 text-white hover:text-black rounded"><Link to={`/manga/${manga.id}`}>View</Link></button>
                                                <EditModal onMangaUpdated={fetchManga} manga={manga} />
                                                <DeleteModal onMangaDeleted={fetchManga} manga={manga} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>

            <footer className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center text-center">Copyright 2025</footer>
        </>
    )
}