import { api } from "../store/api/apiSlice"
import { useDispatch } from "react-redux"

const useRefetchOrderById = () => {

    const dispatch = useDispatch<AppDispatch>()

    const refetchOrderById = async (newId) => {
        await dispatch(api.endpoints.getOrderDataById.initiate(newId, { subscribe: false, forceRefetch: true }));
    }

    return { refetchOrderById }
}

export default useRefetchOrderById