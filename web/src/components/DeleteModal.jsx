import { useState } from "react"
import { createPortal } from "react-dom"
import DeleteModalContent from "./DeleteModalContent";
 function DeleteModal({ manga, onMangaDeleted }) {

    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className="border bg-gray-400" onClick={ () => {setShowModal(true) }}>Delete</button>


            {showModal && createPortal( 
                <DeleteModalContent
                manga={manga}
                onMangaDeleted={onMangaDeleted}
                onClose={ () => { setShowModal( false ) }}
                />,
                document.body
            )}
        </>

    )

}
export default DeleteModal
