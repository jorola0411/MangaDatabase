import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function Filter({ updateManga }) {
    const [openGenre, setOpenGenre] = useState(false);
    const [openAuthor, setOpenAuthor] = useState(false);

    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);


    useEffect(() => {

        fetch("http://localhost:3000/authors")
            .then((response) => response.json())
            .then(data => {
                setAuthors(data);
            });

    }, []);

    useEffect(() => {

        fetch("http://localhost:3000/genres")
            .then((response) => response.json())
            .then(data => {
                setGenres(data);
            });

    }, []);

    const filterSubmit = (event) => {

        event.preventDefault();

        const filterFormData = new FormData(event.target);

        const selectedAuthors = filterFormData.getAll("authors");
        const selectedGenres = filterFormData.getAll("genres");

        const queryArtist = selectedAuthors.map((id) => `authors=${id}`).join("&");
        const queryGenre = selectedGenres.map((genre) => `genres=${genre}`).join("&");

        const queryArtistAndGenre = [queryArtist, queryGenre].filter(Boolean).join("&");

        fetch(`http://localhost:3000/manga?${queryArtistAndGenre}`)
            .then((response) => response.json())
            .then((data) => updateManga(data));
    };

    return (
        <filter className="col-span-1">
            <h1 className="text-left text-5xl pb-10">Filter</h1>
            <form onSubmit={filterSubmit}>
                <div className="border-b pb-2 max-w-[75%]">
                    <button
                        className="flex justify-between cursor-pointer text-2xl w-full"
                        onClick={() => setOpenGenre(!openGenre)}>
                        Genre
                        <FontAwesomeIcon icon={openGenre ? faChevronUp : faChevronDown} />
                    </button>
                    {openGenre && (
            <div className="mt-2">
              {genres.map((genre) => (
                <label
                  className="text-xl flex items-center gap-2"
                  key={genre.id}
                >
                  <input type="checkbox" name="genres" value={genre.id} />
                  {genre.name}
                </label>
              ))}
            </div>
          )}
        </div>


                <div className="border-b pb-2 max-w-[75%]">
                    <button className="flex justify-between cursor-pointer text-2xl  w-full" onClick={() => setOpenAuthor(!openAuthor)}>
                        Author
                        <FontAwesomeIcon icon={openAuthor ? faChevronUp : faChevronDown} />
                    </button>
                    {openAuthor && (
                        <div className="mt-2 ">
                            {authors.map((author) => (
                                <label className="text-xl flex items-center gap-2" 
                                key={author.id} >
                                    <input type="checkbox" name="authors" 
                                    value={author.id} />
                                    {author.name}
                                </label>
                            ))}
                            
                        </div>
                    )}
                </div>
                <input type="submit" value="Apply" className="mt-4 bg-gray-700 text-white p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-black border" />
            </form>
        </filter>
    );
}