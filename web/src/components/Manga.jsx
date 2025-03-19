import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";

export default function Manga() {
    const { id } = useParams();
    const [mangaData, setMangaData] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:3000/manga/${id}`)
            .then(res => res.json())
            .then(data => {
                setMangaData(data);
            })
    }, []);
    

            return (
                <>
                    <div className="container bg-gray-200 w-90 rounded-lg shadow-lg">
                  
                            <p className="text-left">Manga</p>
                            <list>
                            <button className="border bg-gray-400"> <Link to="/">Back</Link></button>
                                <img src={`http://localhost:3000/images/${mangaData.image_name}`} />
                                <h4>{mangaData.name}</h4>
                                <p>{mangaData.author}</p>
                                <p>{mangaData.genre}</p>
                                <p>{mangaData.description}</p>
                            </list>
                        </div>
                    
                </>
            )
        
}