/*
    TODO handle delete and update errors
*/

import { useState } from "react"
import toast from "react-hot-toast"
import { useDeleteProductMutation, useGetCategoriesQuery, useUpdateProductMutation } from "../../../../store/api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../store/store"
import Spinner from "../../../common/spinner/Spinner"
import useRefetchProductsByCategory from "../../../../hooks/useRefetchProductsByCategory"
import { setCurrentSelectedProduct } from "../../../../store/product_options/productOptionsSlice"
import { setEditProductMenu } from "../../../../store/menus/menusSlice"

const Form = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { currentSelectedProduct: product } = useSelector<RootState, { currentSelectedProduct: Product }>(state => state.productOptions)
    const [productData, setProductData] = useState({
        name: product.name,
        price: product.price,
        description: product.description,
        img: product.image,
        category: product.parent,
        variations: []
    })
    const [updateProduct, { isLoading }] = useUpdateProductMutation()
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()
    const { data: categories, isFetching } = useGetCategoriesQuery()
    const { refetchProductsByCategory } = useRefetchProductsByCategory()

    const handleInput = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }

    const handlePriceInput = (e) => {
        const priceRegExp = /^\d+(?:\.\d{0,2})?$/
        if (priceRegExp.test(e.target.value) || e.target.value === "") handleInput(e)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await updateProduct({ id: product.id, ...productData })
            // Refetch for the category of the update and refetch for the "old" category for cases where category changed
            refetchProductsByCategory(response.data.parent)
            refetchProductsByCategory(product.parent)
            dispatch(setEditProductMenu({ open: false, productId: null }))
            dispatch(setCurrentSelectedProduct(null))
            toast.success("Produkt aktualisiert")

        } catch (err) {
            console.log(err)
            toast.error("Error updating product")
        }
    }

    const handleDeleteProduct = async () => {
        try {
            const response = await deleteProduct(product.id)
            refetchProductsByCategory(product.parent)
            dispatch(setEditProductMenu({ open: false, productId: null }))
            dispatch(setCurrentSelectedProduct(null))
            toast.success("Produkt gelöscht")
        } catch (err) {
            console.log(err)
            toast.error("Error deleting product")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInput}
                    className="input-field"
                    placeholder="Name"
                />
            </div>
            <div>
                <label>Preis</label>
                <input
                    type="text"
                    name="price"
                    value={productData.price}
                    onChange={handlePriceInput}
                    className="input-field"
                    placeholder="CHF"
                />
            </div>
            <div>
                <label>Kategorie</label>
                <select
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleInput}
                    className={`w-full truncate ${productData.category.length > 0 ? "text-inherit" : "text-zinc-400"} input-field block w-full focus:outline-none focus:ring-zinc-500 focus:border-zinc-500`}
                >
                    <option className="text-zinc-100" value="" disabled>
                        Kategorie
                    </option>
                    {
                        !isFetching ?
                            categories.map(category => {
                                return (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )
                            }) : null
                    }
                </select>
            </div>
            <div>
                <label>Bild URL</label>
                <input
                    type="text"
                    name="img"
                    value={productData.img}
                    onChange={handleInput}
                    className="input-field"
                    placeholder="Image URL"
                />
            </div>
            <div>
                <label>Beschreibung</label>
                <textarea
                    rows={2}
                    name="description"
                    value={productData.description}
                    placeholder="Beschreibung"
                    className="flex-1 input-field resize-none rounded-md"
                    onChange={handleInput}
                />
            </div>
            <div className="grid grid-cols-12 gap-2">
                <button type="submit" className="col-span-8 primary-button flex gap-2 items-center">
                    {
                        !isLoading ?
                            <>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                <span>Edit Product</span>
                            </> :
                            <Spinner color="text-zinc-100" />
                    }
                </button>
                <div role="button" onClick={handleDeleteProduct} className="col-span-4 secondary-button flex items-center gap-2">
                    {
                        !isDeleting ?
                            <>
                                <span>Löschen</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                                </svg>
                            </> :
                            <Spinner color="text-zinc-100" />
                    }
                </div>
            </div>
        </form>
    )
}

export default Form