import { useState } from "react";
import { createPortal } from "react-dom";
import AddModalContent from "./AddModalContent";

export default function AddModal({ onMangaAdded }) {

    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <button className="border bg-gray-400" onClick={() => { setShowModal(true) }}>Add</button>

            {showModal && createPortal(
                <AddModalContent
                   
                    onMangaAdded={onMangaAdded}
                    onClose={() => { setShowModal(false) }}
                />,
                document.body
            )}
        </>
    )
}