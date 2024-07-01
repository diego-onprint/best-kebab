import { useState, useEffect } from 'react'
import OptionsList from '../options_list/OptionsList'

const VariationButton = ({ variation, variations, setVariations }) => {

    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        // Hndle click ouside
    }, [])

    return (
        <div key={variation.variation_name} className="relative col-span-4">
            <button
                onClick={() => !isOpen ? setTimeout(() => setOpen(true), 20) : setOpen(false)}
                className={`${isOpen && "clickable"} border border-zinc-700 w-full px-4 py-3 rounded-md flex justify-between items-center relative`}
            >
                <span className="truncate pointer-events-none">{variation.variation_name}</span>
                <svg className="pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
            </button>
            {
                isOpen ?
                    <OptionsList
                        options={variation.options}
                        variations={variations}
                        setVariations={setVariations}
                        setOpen={setOpen}
                    /> : null
            }
        </div>
    )
}

export default VariationButton