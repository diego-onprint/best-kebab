import { useSearchParams } from "react-router-dom"
import { urlSearchParamsToObject } from "../utils/urlSearchParamsToObject"


const useNavigation = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const toHomeView = () => {
        const id = searchParams.get("id")
        id && setSearchParams({ id })
    }

    const toOrdersView = () => {
        const paramsObject = urlSearchParamsToObject(searchParams)
        setSearchParams({ ...paramsObject, orders: "ok" })
    }
    
    const toProductView = (id: string) => {
        const paramsObject = urlSearchParamsToObject(searchParams)
        setSearchParams({ ...paramsObject, product: id })
    }

    const toCategoriesView = () => {
        const paramsObject = urlSearchParamsToObject(searchParams)
        setSearchParams({ ...paramsObject, categories: "cat", cart: "opened" })
    }

    const toCheckoutView = () => {
        const paramObject = urlSearchParamsToObject(searchParams)
        setSearchParams({ ...paramObject, checkout: "ok" })
    }

    const toConfirmationView = (bool: boolean) => {
        const paramsObject = urlSearchParamsToObject(searchParams)
        setSearchParams({ ...paramsObject, success: bool ? "true" : "false" })
    }

    return {
        toHomeView,
        toOrdersView,
        toProductView,
        toCategoriesView,
        toCheckoutView,
        toConfirmationView,
    }
}

export default useNavigation