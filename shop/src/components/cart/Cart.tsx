
const Cart = () => {
    return (
        <div className="fixed bottom-0 h-20 bg-white w-full z-50 p-4 grid grid-cols-12 gap-2">
            <div className="col-span-5">
                <p className="text-sm">5 productos</p>
                <p className="text-xl font-bold">CHF. 20</p>
            </div>
            <button className="primary-button col-span-7">Send Order</button>
        </div>
    )
}

export default Cart