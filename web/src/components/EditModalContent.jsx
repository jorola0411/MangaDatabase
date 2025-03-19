import React, { useState, useEffect } from "react";


export default function EditModalContent({ onClose, onMangaUpdated, manga }) {

    const [dbAuthors, setDbAuthors] = useState("");
    const [dbGenres, setDbGenres] = useState("");

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState(manga.description ?? "");


    useEffect(() => {
        fetch("http://localhost:3000/authors")
            .then((response) => response.json())
            .then(responseJSON => {
                setDbAuthors(responseJSON);
                if (responseJSON.length > 0 && !author) {
                    setAuthor(responseJSON[0].id);
                }
            });
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/genres")
            .then((response) => response.json())
            .then(responseJSON => {
                setDbGenres(responseJSON);
                if (responseJSON.length > 0 && !genre) {
                    setGenre(responseJSON[0].id);
                }
            });
    }, [])


    const handleFormSubmit = async (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append("author_id", author);
        formData.append("title", title);
        formData.append("image", image);
        formData.append("genre_id", genre);
        formData.append("description", description)

        const mangaAPIRequest = await fetch(`http://localhost:3000/manga/${manga.id}`,{
            method: "PUT",
            body: formData
        });

        const mangaResult = await mangaAPIRequest.json();
        onClose();
        onMangaUpdated();
     
    };

    return (
        <div className="fixed w-full  bg-[rgba(255,255,255,0.9)] flex justify-center items-center left-0 top-0 z-50;">
            <div className="border bg-gray-400 max-w-[600px]  relative p-8">
                <h1>Edit Manga</h1>
                <form action="" onSubmit={handleFormSubmit} encType="multipart/form-data" >
                    <div>
                        <label htmlFor="author">Author</label>
                 
                            <select
                                name="author"
                                id="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}>
                                {dbAuthors && dbAuthors.map((author, index) => (
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                ))}
                            </select>
                    </div>
                    <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    </div>
                    <div>
                        <label htmlFor="genre">Genre</label>
                     
                            <select
                                name="genre"
                                id="genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}>
                                {dbGenres && dbGenres.map((genre, index) => (
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                ))}
                            </select>
                    </div>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />

                        <label htmlFor="image"> Current Image</label>
                        <img src={`http://localhost:3000/images/${manga.image_name}`} alt="Placeholder" className="max-w-sm"/>

                        <label htmlFor="image"> Upload Image</label>
                        <input type="file"
                            name="image"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div>
                        <button type="submit">Save</button>
                    </div>
                </form>
                <button className="text-[2rem] absolute bg-transparent cursor-pointer border-[none] right-2 top-2"
                    onClick={onClose}
                >x</button>
            </div>
        </div>
    )
}