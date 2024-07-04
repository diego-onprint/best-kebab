/*
    TODO handle subcategories
 */

import { useState } from "react"
import { useDispatch } from "react-redux"
import Spinner from "../../common/spinner/Spinner"
import { useCreateNewCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } from "../../../store/api/apiSlice"
import { setEditCategoryMenu } from "../../../store/menus/menusSlice"
import type { AppDispatch } from "../../../store/store"

const EditCategoryMenu = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [selectedCategory, setSelectedCategory] = useState("")
    const [newCategoryData, setNewCategoryData] = useState({ name: "", img: "" })
    const { data: categories, isFetching: fetchingCategories, refetch } = useGetCategoriesQuery()
    const [createNewCategory, { isLoading: isCreating }] = useCreateNewCategoryMutation()
    const [deleteCategory, { isLoading: isDeleting}] = useDeleteCategoryMutation()

    const disabled = newCategoryData.name === ""
    const deleteDisabled = selectedCategory === "" 

    const handleClose = () => {
        dispatch(setEditCategoryMenu(false))
    }

    const handleInput = (e) => {
        setNewCategoryData({ ...newCategoryData, [e.target.name]: e.target.value})
    }

    const handleCreateSubmit = async (e) => {
        e.preventDefault()

        if (disabled) return

        try {

            const response = await createNewCategory(newCategoryData)

            if (response.data?.error) {
                console.log("Error creating order")
                return
            }

            refetch()
            handleClose()

        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteSubmit = async (e) => {
        e.preventDefault()

        if (deleteDisabled) return

        try {

            const response = await deleteCategory(selectedCategory)

            if (response.data?.error) {
                console.log("Error creating order")
                return
            }

            refetch()
            handleClose()

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div onClick={handleClose} className="modal-overlay">
            <div onClick={(e) => e.stopPropagation()} className="w-11/12 max-w-[800px] bg-white p-6 rounded-lg shadow-lg relative">
                <div className="flex gap-4 items-center mb-4 border-b border-zinc-300 pb-3">
                    <button onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold">Kategorien bearbeiten</h2>
                </div>
                <div className="grid grid-cols-12 gap-4 divide-x divide-zinc-300">
                    <div className="col-span-6 flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Kategorie erstellen</h3>
                        <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={newCategoryData.name}
                                    onChange={handleInput}
                                    className="input-field"
                                    placeholder="Name"
                                />
                            </div>
                            {/* <div>
                                <label>Bild URL</label>
                                <input
                                    type="text"
                                    name="img"
                                    value={newCategoryData.img}
                                    onChange={handleInput}
                                    className="input-field"
                                    placeholder="Image URL"
                                />
                            </div> */}
                            <button type="submit" disabled={disabled} className="col-span-8 primary-button flex gap-2 items-center">
                                {
                                    !isCreating ?
                                        <>
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                            <span>Kategorie erstellen</span>
                                        </> :
                                        <Spinner color="text-zinc-100" />
                                }
                            </button>
                        </form>
                    </div>
                    <div className="col-span-6 pl-4 flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Kategorie Entfernen</h3>
                        <form onSubmit={handleDeleteSubmit} className="flex flex-col gap-4">
                            <select
                                id="category"
                                name="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={`w-full truncate ${selectedCategory ? "text-inherit" : "text-zinc-400"} input-field block w-full focus:outline-none focus:ring-zinc-500 focus:border-zinc-500`}
                            >
                                <option className="text-zinc-100" value="" disabled>
                                    Kategorie
                                </option>
                                {
                                    !fetchingCategories ?
                                        categories.map(category => {
                                            return (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            )
                                        }) : null
                                }
                            </select>
                            <button type="submit" disabled={deleteDisabled} className="col-span-8 primary-button flex gap-2 items-center">
                                {
                                    !isDeleting ?
                                        <>
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                            <span>Kategorie löschen</span>
                                        </> :
                                        <Spinner color="text-zinc-100" />
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCategoryMenu