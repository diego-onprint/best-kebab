import ReturnButton from '../../components/common/return_button/ReturnButton'
import Order from '../../components/order/Order'
import useParam from '../../hooks/useParam'

const Checkout = () => {

    const checkout = useParam("checkout")

    return (
        <div className={`${!checkout && "translate-x-full"} bg-white absolute top-0 right-0 w-screen h-screen transition-transform z-20 flex flex-col flex-1`}>
            <div className="section-header grid place-items-center relative min-h-16">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center">
                    <ReturnButton style="w-5 h-5" />
                </div>
                <h3 className="text-center font-semibold">Zur Kasse</h3>
            </div>
            {checkout ? <Order /> : null}
        </div>
    )
}

export default Checkout