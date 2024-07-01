/*
    TODO add Zod validations for name and category (required)
*/

import { useState } from "react"
import toast from "react-hot-toast"
import { useCreateNewProductMutation, useGetCategoriesQuery } from "../../../../store/api/apiSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../../store/store"
import Spinner from "../../../common/spinner/Spinner"
import { setAddProductMenu } from "../../../../store/menus/menusSlice"
import useRefetchProductsByCategory from "../../../../hooks/useRefetchProductsByCategory"

const NewProductModel = {
    name: "",
    price: "0",
    description: "",
    img: "",
    category: "",
    variations: []
}

const Form = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [productData, setProductData] = useState(NewProductModel)
    const [createNewProduct, { isLoading }] = useCreateNewProductMutation()
    const { data: categories } = useGetCategoriesQuery()
    const { refetchProductsByCategory } = useRefetchProductsByCategory()

    const disabled = productData.name.length <= 0 || productData.category.length <= 0

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
            const response = await createNewProduct(productData)
            refetchProductsByCategory(response.data.parent)
            dispatch(setAddProductMenu(false))
            toast.success("Produkt erstellt")
        } catch (err) {
            console.log(err)
            toast.error("Error creating product")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInput}
                className="input-field"
                placeholder="Name"
            />
            <input
                type="text"
                name="price"
                value={productData.price}
                onChange={handlePriceInput}
                className="input-field"
                placeholder="CHF"
            />
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
                    categories.map(category => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })
                }
            </select>
            <input
                type="text"
                name="img"
                value={productData.img}
                onChange={handleInput}
                className="input-field"
                placeholder="Image URL"
            />
            <textarea
                rows={2}
                name="description"
                value={productData.description}
                placeholder="Beschreibung"
                className="flex-1 input-field resize-none rounded-md"
                onChange={handleInput}
            />
            <button type="submit" disabled={disabled} className="primary-button flex gap-2 items-center">
                {
                    !isLoading ?
                        <>
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <span>Produkt erstellen</span>
                        </> :
                        <Spinner color="text-zinc-100" />
                }
            </button>
        </form>
    )
}

export default Form