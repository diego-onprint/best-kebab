import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { useGetProductsVariationsQuery } from "../../../store/api/apiSlice"
import { Product, ProductVariation } from "../../../types"
import { formatVariations } from "../../../utils/formatVariations"
import Option from "./option/Option"
import { createTimestamp } from "../../../utils/createTimestamp"

type PropsTypes = {
    id: Product["id"]
    setVariation: Dispatch<SetStateAction<ProductVariation>>
}

const Options = ({ id, selectedVariations, setSelectedVariations }: PropsTypes) => {

    const { data } = useGetProductsVariationsQuery(id)
    const [formatedVariations, setFormatedVariations] = useState(null)

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

    useEffect(() => {
        if (data) {
            setFormatedVariations(formatVariations(data.variations))
        }
    }, [data])

    return (
        <div className="w-full">
            <label>Options</label>
            <fieldset>
                <legend className="sr-only">Select options</legend>
                <div className="flex flex-col gap-2 mt-2">
                    {
                        formatedVariations ?
                            formatedVariations.map(variation => {
                                return (
                                    <div key={variation.name}>
                                        <h3 className="font-semibold pb-1">{variation.name}</h3>
                                        {
                                            variation.options.map(option => {
                                                return (
                                                    <Option
                                                        option={option}
                                                        handleSelected={handleSelected}
                                                        selectedVariations={selectedVariations}
                                                        key={option.id}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }) :
                            <div className="flex flex-col gap-2">
                                <div className="w-20 h-4 bg-zinc-300"></div>
                                <div className="w-20 h-4 bg-zinc-300"></div>
                                <div className="w-20 h-4 bg-zinc-300"></div>
                            </div>
                    }
                </div>
            </fieldset>
        </div>
    )
}

export default Options