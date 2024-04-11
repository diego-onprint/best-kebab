import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { useGetProductsVariationsQuery } from "../../../store/api/apiSlice"
import { Product, ProductVariation } from "../../../types"
import { formatVariations } from "../../../utils/formatVariations"
import Option from "./option/Option"
import { createTimestamp } from "../../../utils/createTimestamp"
import VariationButton from "./variation_button/VariationButton"

type PropsTypes = {
    id: Product["id"]
    setVariation: Dispatch<SetStateAction<ProductVariation>>
}

const VariationsMenu = ({ variations, selectedVariations, setSelectedVariations }: PropsTypes) => {

    const handleSelected = (option) => {

        const timestamp = createTimestamp()

        const parsedOption = {
            ...option,
            timestamp: timestamp
        }

        // Check if same parent to overwrite
        const sameParentIndex = selectedVariations.findIndex(selectedVariation => selectedVariation.parent === option.parent)

        //If not same parent add new option
        if (sameParentIndex === -1) {
            return setSelectedVariations([...selectedVariations, parsedOption])
        }

        //If same option selected, remove option 
        const index = selectedVariations.findIndex(selectedVariation => selectedVariation.id === option.id)
        const isSelected = index !== -1 ? true : false

        if (isSelected) {
            const filteredSelection = selectedVariations.filter(selectedVariation => selectedVariation.id !== option.id)
            return setSelectedVariations([...filteredSelection])
        }

        //Else overwrite the selected option for same parent
        const filteredOptions = selectedVariations.filter(selectedVariation => selectedVariation.parent !== option.parent)
        setSelectedVariations([...filteredOptions, parsedOption])
    }

    return (
        <>
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
        </>
    )
}

export default VariationsMenu