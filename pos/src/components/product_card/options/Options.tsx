import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { useGetProductsVariationsQuery } from "../../../store/api/apiSlice"
import { Product, ProductVariation } from "../../../types"
import { formatVariations } from "../../../utils/formatVariations"

type PropsTypes = {
    id: Product["id"]
    setVariation: Dispatch<SetStateAction<ProductVariation>>
}

const Options = ({ id, selectedVariations, setSelectedVariations }: PropsTypes) => {

    const { data } = useGetProductsVariationsQuery(id)
    const [formatedVariations, setFormatedVariations] = useState(null)

    // const handleSelected = (variation: ProductVariation) => {
    //     setVariation({
    //         attributes: [...variation.attributes],
    //         id: variation.id,
    //         price: variation.price,
    //         description: variation.description
    //     })
    // }

    const handleSelected = (option) => {

        // Check if same parent to overwrite
        const sameParentIndex = selectedVariations.findIndex(selectedVariation => selectedVariation.parent === option.parent)

        //If not same parent add new option
        if (sameParentIndex === -1) {

            return setSelectedVariations([...selectedVariations, option])

        }

        
        //Else overwrite the selected option
        const filteredOptions = selectedVariations.filter(selectedVariation => selectedVariation.parent !== option.parent)
        setSelectedVariations([...filteredOptions, option])


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
                                        <h3>{variation.name}</h3>
                                        {
                                            variation.options.map(option => {
                                                return (
                                                    <div className="flex gap-2 items-center" key={option.id}>
                                                        <input
                                                            value={option.id}
                                                            type="radio"
                                                            id={option.id.toString()}
                                                            name={variation.name}
                                                            className="cursor-pointer"
                                                            onChange={() => handleSelected(option)}
                                                        />
                                                        <label>{option.name}</label>
                                                    </div>
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