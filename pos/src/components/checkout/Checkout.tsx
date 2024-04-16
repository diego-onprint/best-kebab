import { Dispatch, SetStateAction } from "react"
import Controller from "./Controller"

type PropsTypes = {
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
}

const Checkout = ({ setOpenCheckout }: PropsTypes) => {
    return <Controller setOpenCheckout={setOpenCheckout} />
}

export default Checkout