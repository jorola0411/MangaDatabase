export default function DeleteModalContent ( {manga, onClose, onMangaDeleted}) {
    
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

    return(
        <div className="fixed w-full h-full bg-[rgba(255,255,255,0.9)] flex justify-center items-center left-0 top-0 z-50;">
        <div className="border bg-gray-400 max-w-[600px] w-full relative p-8">

            <h3>Are you sure you want to delete {manga.name} by {manga.author}?</h3>
            <form onSubmit={deleteManga}>
                <button
                    className="border bg-gray-400"
                    type="submit"
                >Yuh, delete the manga.
                </button>
            </form>
            <button className="text-[2rem] absolute bg-transparent cursor-pointer border-[none] right-2 top-2"
                onClick={onClose}
            >x</button>
        </div>
    </div>
    )
}