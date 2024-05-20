import { useSearchParams } from "react-router-dom"
import { urlSearchParamsToObject } from "../utils/urlSearchParamsToObject"


const useNavigation = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const toCheckoutView = () => {
        const paramObject = urlSearchParamsToObject(searchParams)
        setSearchParams({ ...paramObject, checkout: "ok" })
    }

    const toConfirmationView = (bool: boolean) => {
        const paramsObject = urlSearchParamsToObject(searchParams)
        setSearchParams({ ...paramsObject, success: bool ? "true" : "false" })
    }

    const toHomeView = () => {
        const id = searchParams.get("id")
        id && setSearchParams({ id })
    }

    const toOrdersView = () => {
        const id = searchParams.get("id")
        setSearchParams({ id, orders: "ok" })
    }
    
    const toProductView = (id: string) => {
        const paramsObject = urlSearchParamsToObject(searchParams)
        setSearchParams({ ...paramsObject, product: id })
    }

    return {
        toCheckoutView,
        toConfirmationView,
        toHomeView,
        toOrdersView,
        toProductView,
    }
}

export default useNavigation