import { useDispatch } from "react-redux"
import { setAddProductMenu } from "../../../store/menus/menusSlice"
import Form from "./form/Form"

const AddProductMenu = () => {

    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => dispatch(setAddProductMenu(false))

    return (
        <div onClick={handleClose} className="modal-overlay">
            <div onClick={(e) => e.stopPropagation()} className="w-11/12 max-w-[800px] bg-white p-6 rounded-lg shadow-lg relative">
                <span onClick={handleClose} className="absolute top-2 right-4 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </span>
                <h2 className="text-xl font-semibold mb-4">Neues Produkt</h2>
                <Form />
            </div>
        </div>
    )
}

export default AddProductMenu  