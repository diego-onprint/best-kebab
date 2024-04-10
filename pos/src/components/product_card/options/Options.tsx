import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { useGetProductsVariationsQuery } from "../../../store/api/apiSlice"
import { Product, ProductVariation } from "../../../types"
import { formatVariations } from "../../../utils/formatVariations"
import Option from "./option/Option"
import { createTimestamp } from "../../../utils/createTimestamp"
import OptionsMenu from "./options_menu/OptionsMenu"

type PropsTypes = {
    id: Product["id"]
    setVariation: Dispatch<SetStateAction<ProductVariation>>
}

const Options = ({ variations, selectedVariations, setSelectedVariations }: PropsTypes) => {

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
        <div className="w-full">
            <label>Options</label>
            <fieldset>
                <legend className="sr-only">Select options</legend>
                <div className="flex flex-col gap-2 mt-2">
                    {
                        variations.map(variation => {
                            return (
                                <OptionsMenu
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
    )
}

export default Options