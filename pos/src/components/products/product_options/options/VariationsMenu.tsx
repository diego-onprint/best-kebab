import { createTimestamp } from "../../../../utils/create/createTimestamp"
import VariationButton from "./variation_button/VariationButton"

const VariationsMenu = ({ variations, productVariations, setProductVariations }) => {

    const handleSelected = (option) => {

        // If same option selected, remove option 
        const index = productVariations.findIndex(productVariation => productVariation.option_id === option.option_id)
        const isSelected = index !== -1 ? true : false

        if (isSelected) {
            const filteredSelection = productVariations.filter(productVariation => productVariation.option_id !== option.option_id)
            return setProductVariations([...filteredSelection])
        }

        // Add option
        const timestamp = createTimestamp()

        const parsedOption = {
            ...option,
            timestamp: timestamp
        }

        setProductVariations([...productVariations, parsedOption])
    }

    return (
        <div className="flex flex-col gap-3">
            <div>
                <label className="font-semibold">Options</label>
                <fieldset className="">
                    <legend className="sr-only">Select options</legend>
                    <div className="grid grid-cols-12 gap-2">
                        {
                            variations.map(variation => {
                                return (
                                    <VariationButton
                                        key={variation.variation_id}
                                        variation={variation}
                                        handleSelected={handleSelected}
                                        selectedVariations={productVariations}
                                    />
                                )
                            })
                        }
                    </div>
                </fieldset>
            </div>
            {
                productVariations.length > 0 ?
                    <div className="flex whitespace-nowrap gap-2 overflow-x-auto no-scrollbar">
                        {
                            productVariations.map(productVariation => {
                                return (
                                    <button onClick={() => handleSelected(productVariation)} key={productVariation.option_id} className="flex gap-2 items-center p-2 bg-blue-500 text-white rounded-md">
                                        <span className="text-xs">{productVariation.option_name}</span>
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