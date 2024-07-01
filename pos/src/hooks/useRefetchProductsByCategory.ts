import { api } from "../store/api/apiSlice"
import { useDispatch } from "react-redux"

const useRefetchProductsByCategory = () => {

    const dispatch = useDispatch<AppDispatch>()

    const refetchProductsByCategory = (newId) => {
        dispatch(api.endpoints.getProductsByCategory.initiate(newId, { subscribe: false, forceRefetch: true }));
    }

    return { refetchProductsByCategory }
}

export default useRefetchProductsByCategory