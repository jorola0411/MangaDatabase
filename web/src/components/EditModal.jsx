import { useState } from "react"
import { createPortal } from "react-dom"
import EditModalContent from "./EditModalContent";

export default function EditModal({ manga, onMangaUpdated }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="border bg-gray-400" onClick={ () => {setShowModal(true) }}>Edit</button>

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
