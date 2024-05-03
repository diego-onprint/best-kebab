import { Dispatch, SetStateAction } from "react"
import { Product, ProductVariation } from "../../../../types"
import { createTimestamp } from "../../../../utils/create/createTimestamp"
import VariationButton from "./variation_button/VariationButton"

type PropsTypes = {
    id: Product["id"]
    setVariation: Dispatch<SetStateAction<ProductVariation>>
}

const VariationsMenu = ({ variations, selectedVariations, setSelectedVariations }: PropsTypes) => {

    const handleSelected = (option) => {

        // If same option selected, remove option 
        const index = selectedVariations.findIndex(selectedVariation => selectedVariation.id === option.id)
        const isSelected = index !== -1 ? true : false

        if (isSelected) {
            const filteredSelection = selectedVariations.filter(selectedVariation => selectedVariation.id !== option.id)
            return setSelectedVariations([...filteredSelection])
        }

        // Add option
        const timestamp = createTimestamp()

        const parsedOption = {
            ...option,
            timestamp: timestamp
        }

        setSelectedVariations([...selectedVariations, parsedOption])
    }

    return (
        <div className="flex flex-col gap-3">
            <div>
                <label>Options</label>
                <fieldset className="mt-2">
                    <legend className="sr-only">Select options</legend>
                    <div className="grid grid-cols-12 gap-2">
                        {
                            variations.map(variation => {
                                return (
                                    <VariationButton
                                        key={variation.id}
                                        variation={variation}
                                        handleSelected={handleSelected}
                                        selectedVariations={selectedVariations}
                                    />
                                )
                            })
                        }
                    </div>
                </fieldset>
            </div>
            {
                selectedVariations.length > 0 ?
                    <div className="flex whitespace-nowrap gap-2 overflow-x-auto no-scrollbar">
                        {
                            selectedVariations.map(selectedVariation => {
                                return (
                                    <button onClick={() => handleSelected(selectedVariation)} className="flex gap-2 items-center p-2 bg-zinc-100 rounded-md">
                                        <span className="text-xs">{selectedVariation.name}</span>
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )
                            })
                        }
                    </div> : null
            }
        </div>
    )
}

export default VariationsMenu