import { useNavigate } from "react-router-dom"

type PropsTypes = {
    style?: string
}

const ReturnButton = ({ style = "w-4 h-4" }: PropsTypes) => {

    const navigate = useNavigate()

    return (
        <button onClick={() => navigate(-1)}>
            <svg className={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
        </button>
    )
}

export default ReturnButton