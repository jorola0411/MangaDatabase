import { useState } from "react"
import { createPortal } from "react-dom"

export default function DeleteModal({ manga, onMangaDeleted }) {

    const [showModal, setShowModal] = useState(false);

    const deleteManga = (event) => {
        event.preventDefault();

        fetch(`http://localhost:3000/manga/${manga.id}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                onMangaDeleted();
                onClose();
            })

    }

    return (

  <>
            <button className="border bg-gray-400 max-w-[600px] w-full relative p-8" onClick={() => { setShowModal(true) }} >Delete</button>
      
                    <h3>Are you sure you want to delete {manga.name} by {manga.author}?</h3>
                    <form onSubmit={deleteManga}>
                        <button
                            className="border bg-gray-400"
                            type="submit"
                        >Yuh, delete the manga.</button>
                    </form>
                    <button
                        
                        onClick={() => setShowModal(false)}
                    >x</button>

</>

    
    )

}

  