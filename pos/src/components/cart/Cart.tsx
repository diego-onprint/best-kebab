import CartController from "./CartController"

const Cart = () => {

    //TODO UNINSTALL AXIOS!!
    // const handleCheckout = async () => {

    //     setLoading(true)
    //     setDisabled(true)

    //     try {

    //         const orderData = {
    //             products: cartProducts,
    //             isStore: true,
    //         }

    //         const response = await axios.post("/api/new-order", orderData)

    //         console.log("RESPONSE.....", response)

    //         setSuccess(true)

    //         dispatch(clearCart())

    //     } catch (err) {
    //         //setError
    //         console.log(err)
    //     } finally {
    //         // setLoading(false)
    //         // setDisabled(false)
    //         setTimeout(() => success && setSuccess(false), 5000)

    //         setTimeout(() => {
    //             setLoading(false)
    //             setDisabled(false)
    //         }, 3000)
    //     }
    // }

    return <CartController />
}

export default Cart