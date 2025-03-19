import React, { useState, useEffect } from "react";


export default function AddModalContent({ onClose, onMangaAdded }) {

    const [dbAuthors, setDbAuthors] = useState("");
    const [dbGenres, setDbGenres] = useState("");

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [genre, setGenre] = useState("");

    const [isNewAuthor, setIsNewAuthor] = useState(false);
    const [newAuthor, setNewAuthor] = useState("");

    const [isNewGenre, setIsNewGenre] = useState(false);
    const [newGenre, setNewGenre] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/artists")
            .then((res) => res.json())
            .then((data) => {
                setDbAuthors(data);
                if (data.length > 0) {
                    setAuthor(data[0].id);
                }
            });
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/genres")
            .then((res) => res.json())
            .then((data) => {
                setDbGenres(data);
                if (data.length > 0) {
                    setGenre(data[0].id);
                }
            });
    }, [])

    const HandleAuthorSelectChange = (eventTrigger) => {
        if (eventTrigger.target.value === "-1") {
            setIsNewAuthor(true);
            setAuthor("");
        } else {
            setIsNewAuthor(false);
            setAuthor(eventTrigger.target.value);
        }
    };

    const HandleGenreSelectChange = (eventTrigger) => {
        if (eventTrigger.target.value === "-1") {
            setIsNewGenre(true);
            setGenre("");
        } else {
            setIsNewGenre(false);
            setGenre(eventTrigger.target.value);
        }
    };

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        let authorId = author;

        if (isNewAuthor) {

            const newAuthorFetchMeta = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newAuthor })
            };

            fetch("http://localhost:3000/authors", newAuthorFetchMeta)
                .then((response) => response.json())
                .then((data) => {
                    authorId = data.authorId;
                });
        }

        let genreId = genre;

        if (isNewGenre) {

            const newGenreFetchMeta = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newGenre })
            };

            fetch("http://localhost:3000/genres", newGenreFetchMeta)
                .then((response) => response.json())
                .then((data) => {
                    genreId = data.genreId;
                });
        }

        const formData = new FormData();
        formData.append("author_id", authorId);
        formData.append("name", title);
        formData.append("image", image);
        formData.append("genre", genreId);

        fetch("http://localhost:3000/manga", { method: "POST", body: formData })
            .then((response) => response.json())
            .then(data => {
                onMangaAdded();
                onClose();
            });
    };

    return (
        <div className="fixed w-full h-full bg-[rgba(255,255,255,0.9)] flex justify-center items-center left-0 top-0 z-50;">
            <div className="border bg-gray-400 max-w-[600px] w-full relative p-8">
                <h1>Add a new manga</h1>
                <form action="" onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div>
                        <label htmlFor="author">Author</label>
                        {!isNewAuthor ? (
                            <select
                                name="author"
                                id="author"
                                value={author}
                                onChange={HandleAuthorSelectChange}>
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
                                    onChange={(e) => setNewAuthor(e.target.value)} />
                                <button onClick={() => setIsNewAuthor(false)}>Show List</button>
                            </>
                        )}
                    </div>
                    <div>
                        <label htmlFor="genre">Genre</label>
                        {!isNewGenre ? (
                            <select
                                name="genre"
                                id="genre"
                                value={genre}
                                onChange={HandleGenreSelectChange}>
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
                                    onChange={(e) => setNewGenre(e.target.value)} />
                                <button onClick={() => setIsNewGenre(false)}>Show List</button>
                            </>
                        )}
                    </div>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={(e) => setTitle(e.target.value)} />
                        <label htmlFor="image">Image</label>
                        <input type="file"
                            name="image"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div>
                        <button type="submit">Add Manga</button>
                    </div>
                </form>
                <button className="text-[2rem] absolute bg-transparent cursor-pointer border-[none] right-2 top-2"
                    onClick={onClose}
                >x</button>
            </div>
        </div>
    )
}