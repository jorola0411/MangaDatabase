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
        <div className="border bg-gray-200 max-w-[600px] w-full relative p-8">

            <h1 className="text-3xl mb-3">Are you sure you want to delete {manga.name} by {manga.author}?</h1>
            <form onSubmit={deleteManga}>
                <button
                    className="border bg-gray-800 text-2xl hover:bg-red-500 text-white p-1 cursor-pointer transition-colors"
                    type="submit"
                >Yuh, delete the manga.
                </button>
            </form>
            <button className="text-2xl absolute bg-transparent cursor-pointer border-[none] right-2 top-2 hover:bg-red-500 hover:text-white p-3 transition-colors"
                onClick={onClose}
            >X</button>
        </div>
    </div>
    )
}