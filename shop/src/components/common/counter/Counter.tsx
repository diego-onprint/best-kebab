import { Dispatch, SetStateAction } from "react"

type PropsTypes = {
    qty: number
    setQty: Dispatch<SetStateAction<number>>
}

const Counter = ({ qty, setQty }: PropsTypes) => {
    return (
        <div className="flex w-full h-full max-w-32  border border-slate-700 rounded-md">
            <button
                onClick={() => setQty(prev => prev - 1 >= 1 ? prev - 1 : prev)}
                className="flex flex-1 justify-center items-center disabled:opacity-30"
                disabled={false}
            >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <p className="bg-white flex items-center justify-center flex-1 font-semibold text-xl">{qty}</p>
            <button
                onClick={() => setQty(prev => prev + 1)}
                className="flex flex-1 justify-center items-center disabled:opacity-30"
                disabled={false}
            >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    )
}

export default Counter