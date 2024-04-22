import { Dispatch, SetStateAction } from "react"
import Controller from "./Controller"

type PropsTypes = {
    setOpenCheckout: Dispatch<SetStateAction<boolean>>
}

const CreateTkwForm = ({ setOpenTkwForm }: PropsTypes) => {
    return <Controller setOpenTkwForm={setOpenTkwForm} />
}

export default CreateTkwForm