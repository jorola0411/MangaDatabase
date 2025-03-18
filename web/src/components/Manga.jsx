import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Manga() {
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
    {
        manga.map(manga => {
            return (
                <>
                    <div className="container bg-gray-200 w-90 rounded-lg shadow-lg">
                        <div key={manga.id}>
                            <p className="text-left">Manga</p>
                            <list>
                                <Link to="/"></Link>
                                <img src={`http://localhost:3000/images/${manga.image_name}`} />
                                <h4>{manga.name}</h4>
                                <p>{manga.author}</p>
                                <p>{manga.genre}</p>
                            </list>
                        </div>
                    </div>
                </>
            )
        })
    }
}