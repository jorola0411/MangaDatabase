import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function Filter({ updateManga }) { //update manga is a prop that passed from the parent component to update the list
    const [openGenre, setOpenGenre] = useState(false); //open genre/author handles the visibility of the dropdowns later
    const [openAuthor, setOpenAuthor] = useState(false);

    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]); // authors/genres handles the authors/genres stored from the api


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

    }, []); //we have an empty array to make sure the use effect runs only one time.

    //this function handles the form submission for the filters
    const filterSubmit = (event) => {

        event.preventDefault(); //event.preventdefault prevents the apply button from being clicked if no filter is applied

        const filterFormData = new FormData(event.target); //this line of code creates a new Form Data object

        const selectedAuthors = filterFormData.getAll("authors"); //this gets all the selected authors/genres from the list
        const selectedGenres = filterFormData.getAll("genres");

        const queryArtist = selectedAuthors.map((id) => `authors=${id}`).join("&"); //we use these two lines of codes to create query parameters and .join is used to concatenate the authors/genres like Shonen&Action&Romance
        const queryGenre = selectedGenres.map((genre) => `genres=${genre}`).join("&");

        const queryArtistAndGenre = [queryArtist, queryGenre].filter(Boolean).join("&"); //this line of code combines both the query parameters above

        fetch(`http://localhost:3000/manga?${queryArtistAndGenre}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => updateManga(data)); //we fetch the genres/authors only from the api using the function above.
    };

    return (
        <filter className="col-span-1">
            <h1 className="text-left text-5xl pb-10">Filter</h1>
            <form onSubmit={filterSubmit}>
                <div className="border-b pb-2 max-w-[75%]">
                    <button
                        className="flex justify-between cursor-pointer text-2xl w-full"
                        onClick={() => setOpenGenre(!openGenre)}> {/* This is for the filter dropdown, and toggles the dropdown*/ }
                        Genre
                        <FontAwesomeIcon icon={openGenre ? faChevronUp : faChevronDown} />
                    </button>
                    {openGenre && ( //this conditionally renders the genre checkboxes when the dropdown is open
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