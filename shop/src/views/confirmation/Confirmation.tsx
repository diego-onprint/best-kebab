import { getLocalStorageItem } from '../../utils/localStorage'
import useNavigation from '../../hooks/useNavigation'
import useParam from '../../hooks/useParam'

const Confirmation = () => {

    const success = useParam("success")
    const localOrders = getLocalStorageItem("orders")
    const { toHomeView, toOrdersView } = useNavigation()

    if (success === "true" && localOrders) {
        return (
            <div className="bg-neutral-100 absolute top-0 right-0 w-screen h-screen transition-transform z-[999] flex items-center justify-center flex-1">
                <div className="max-w-80 mx-auto flex flex-col gap-1 p-5 shadow-md rounded-md bg-white">
                    <p className="text-md font-semibold">Order placed succesfully</p>
                    <div className="flex flex-col mt-4 gap-2">
                        <button onClick={toHomeView} className='primary-button'>New order</button>
                        <button onClick={toOrdersView} className='primary-button'>My Orders</button>
                    </div>
                </div>
            </div>
        )
    }

    if (success === "false") {
        return (
            <div className="bg-white absolute top-0 right-0 w-screen h-screen transition-transform z-[999] flex items-center justify-center flex-1">
                <div className="max-w-80 mx-auto flex flex-col gap-1">
                    <p>Error placing the order.</p>
                    <p>Please contact our staff.</p>
                    <button onClick={goHome} className='ghost-button mt-4'>Return</button>
                </div>
            </div>
        )
    }

    if (!success || !localOrders) return
}

export default Confirmation