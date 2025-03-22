import React, { useState, useEffect } from "react";


export default function AddModalContent({ onClose, onMangaAdded }) {

    const [dbAuthors, setDbAuthors] = useState("");
    const [dbGenres, setDbGenres] = useState("");

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");

    const [isNewAuthor, setIsNewAuthor] = useState(false);
    const [newAuthor, setNewAuthor] = useState("");

    const [isNewGenre, setIsNewGenre] = useState(false);
    const [newGenre, setNewGenre] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/authors")
            .then((response) => response.json())
            .then(responseJSON => {
                setDbAuthors(responseJSON);
                if (responseJSON.length > 0) {
                    setAuthor(responseJSON[0].id);
                }
            });
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/genres")
            .then((response) => response.json())
            .then(responseJSON => {
                setDbGenres(responseJSON);
                if (responseJSON.length > 0) {
                    setGenre(responseJSON[0].id);
                }
            });
    }, [])

    const HandleAuthorSelectChange = (eventElement) => {
        if (eventElement.target.value === "-1") {
            setIsNewAuthor(true);
            setAuthor("");
        } else {
            setIsNewAuthor(false);
            setAuthor(eventElement.target.value);
        }
    };

    const HandleGenreSelectChange = (eventElement) => {
        if (eventElement.target.value === "-1") {
            setIsNewGenre(true);
            setGenre("");
        } else {
            setIsNewGenre(false);
            setGenre(eventElement.target.value);
        }
    };

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        let author_id = author;

        if (isNewAuthor) {

            const authorResponse = await fetch("http://localhost:3000/authors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author_name: newAuthor })
            });

            const authorData = await authorResponse.json();

            author_id = authorData.author_id;
        }

        let genre_id = genre;

        if (isNewGenre) {


            const genreResponse = await fetch("http://localhost:3000/genres", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ genre_name: newGenre })
            });

            const genreData = await genreResponse.json();

            genre_id = genreData.genre_id;
        }

        const formData = new FormData();
        formData.append("author_id", author_id);
        formData.append("title", title);
        formData.append("image", image);
        formData.append("genre_id", genre_id);
        formData.append("description", description);

        const mangaAPIRequest = await fetch("http://localhost:3000/manga",{
            method: "POST",
            body: formData
        });

        const mangaResult = await mangaAPIRequest.json();

        onClose();
        onMangaAdded();
    };

    return (
        <div className="fixed inset-0 bg-[rgba(255,255,255,0.9)] flex justify-center items-center left-0 top-0 z-50;">
            <div className="border shadow-2xl bg-gray-200 max-w-[600px] max-h-[90vh] overflow-y-auto w-full relative p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Add a new manga</h1>
                <form action="" onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div>
                        <label htmlFor="author" className="block font-semibold mb-2">Author</label>
                        {!isNewAuthor ? (
                            <select
                                name="author"
                                id="author"
                                value={author}
                                onChange={HandleAuthorSelectChange}
                                >
                                {dbAuthors && dbAuthors.map((author, index) => (
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                ))}
                                <option value="-1">New Author</option>
                            </select>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    name="author"
                                    id="author"
                                    value={newAuthor}
                                    onChange={(e) => setNewAuthor(e.target.value)} 
                                    required
                                    className=" border rounded p-1 gap-5"/>
                                <button onClick={() => setIsNewAuthor(false)}  className=" border rounded p-1">Show List</button>
                            </>
                        )}
                    </div>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={(e) => setTitle(e.target.value)} 
                            required
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
                        {!isNewGenre ? (
                            <select
                                name="genre"
                                id="genre"
                                value={genre}
                                onChange={HandleGenreSelectChange}
                                className="w-full border rounded p-2">
                                {dbGenres && dbGenres.map((genre, index) => (
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                ))}
                                <option value="-1">New Genre</option>
                            </select>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    name="genre"
                                    id="genre"
                                    value={newGenre}
                                    onChange={(e) => setNewGenre(e.target.value)} 
                                    required
                                    className=" border rounded p-1 gap-5"/>
                                <button onClick={() => setIsNewGenre(false)} className=" border rounded p-1 gap-5">Show List</button>
                            </>
                        )}
                    </div>

                        <div>
                        <label htmlFor="image" className="block font-semibold mb-2">Image</label>
                        <input type="file"
                            name="image"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])} 
                            required
                            className="cursor-pointer"/>
                    </div>
                    <div>
                        <button type="submit" className="border bg-gray-800 p-1 hover:bg-green-500 text-white text-2xl hover:text-black rounded transition-colors mt-3">Add Manga</button>
                    </div>
                </form>
                <button className="text-[2rem] absolute bg-transparent cursor-pointer border-[none] right-2 top-2 hover:bg-red-500 hover:text-white p-3 transition-colors"
                    onClick={onClose}
                >x</button>
            </div>
        </div>
    )
}