import { api } from "../store/api/apiSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"

const useRefetchOrders = () => {

    const dispatch = useDispatch<AppDispatch>()

    const refetchOrdersByPage = async ({ page = 1, limit = 10, condition = "all" }) => {
        await dispatch(api.endpoints.getOrdersByPage.initiate({ page, limit, condition }, { subscribe: false, forceRefetch: true }));
    }

    return { refetchOrdersByPage }
}

export default useRefetchOrders