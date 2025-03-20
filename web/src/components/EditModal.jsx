import { useState } from "react"
import { createPortal } from "react-dom"
import EditModalContent from "./EditModalContent";

export default function EditModal({ manga, onMangaUpdated }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="border bg-gray-800 p-1 text-white hover:bg-yellow-500 hover:text-black cursor-pointer rounded" onClick={ () => {setShowModal(true) }}>Edit</button>

            {showModal && createPortal( 
                <EditModalContent
                manga={manga}
                onMangaUpdated={onMangaUpdated}
                onClose={ () => { setShowModal( false ) }}
                />,
                document.body
            )}
        </>
    )
}
