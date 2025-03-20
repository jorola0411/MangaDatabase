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

        const mangaAPIRequest = await fetch(`http://localhost:3000/manga/${manga.id}`, {
            method: "PUT",
            body: formData
        });

        const mangaResult = await mangaAPIRequest.json();
        onClose();
        onMangaUpdated();

    };

    return (
        <div className="fixed inset-0  bg-[rgba(255,255,255,0.9)] flex justify-center items-center left-0 top-0 z-50;">
            <div className="border shadow-2xl bg-gray-200 max-w-[600px] max-h-[90vh] overflow-y-auto relative p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Edit Manga</h1>
                <form action="" onSubmit={handleFormSubmit} encType="multipart/form-data" className="space-y-3">
                    <div>
                        <label htmlFor="author" className="block font-semibold mb-2">Author</label>

                        <select
                            name="author"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            className="w-full border rounded p-1">
                            {dbAuthors && dbAuthors.map((author, index) => (
                                <option key={author.id} value={author.id}>{author.name}</option>
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
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded p-2"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-semibold mb-2">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded p-2 h-24">
                            </textarea>
                    </div>
                    <div>
                        <label htmlFor="genre" className="block font-semibold mb-2">Genre</label>
                        <select
                            name="genre"
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="w-full border rounded p-2">
                            {dbGenres && dbGenres.map((genre, index) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="image" className="block font-semibold mb-2"> Current Image</label>

                        <img src={`http://localhost:3000/images/${manga.image_name}`} alt="Placeholder" className="w-50 mb-3" />

                        <label htmlFor="image" className="block font-semibold mb-2"> Upload New Image</label>
                        <input type="file"
                            name="image"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])} 
                            className="w-full cursor-pointer"/>
                    </div>
                    <div>
                        <button type="submit" className="border bg-gray-800 p-1 hover:bg-green-500 text-white text-2xl hover:text-black rounded transition-colors">Save</button>
                    </div>
                </form>
                <button className="text-2xl absolute bg-transparent cursor-pointer border-[none] right-2 top-2 hover:bg-red-500 hover:text-white p-3 transition-colors"
                    onClick={onClose}
                >x</button>
            </div>
        </div>
    )
}