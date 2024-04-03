import { Dispatch, SetStateAction } from "react"
import { useGetProductsVariationsQuery } from "../../../store/api/apiSlice"
import { Product, ProductVariation } from "../../../types"

type PropsTypes = {
    id: Product["id"]
    setVariation: Dispatch<SetStateAction<ProductVariation>>
}

const Options = ({ id, setVariation }: PropsTypes) => {

    const { data, isFetching } = useGetProductsVariationsQuery(id)

    const handleSelected = (variation: ProductVariation) => {
        setVariation({
            attributes: [...variation.attributes],
            id: variation.id,
            price: variation.price,
            description: variation.description
        })
    }

    return (
        <div className="w-full">
            <label>Options</label>
            <fieldset>
                <legend className="sr-only">Select options</legend>
                <div className="flex flex-col gap-2 mt-2">
                    {
                        !isFetching ?
                            data.variations.map(variation => {
                                return (
                                    <div className="flex gap-2 items-center" key={variation.id}>
                                        <input
                                            value={variation.id}
                                            type="radio"
                                            id={variation.id.toString()}
                                            name="options"
                                            className="cursor-pointer"
                                            onChange={() => handleSelected(variation)}
                                        />
                                        <label>{variation.attributes[0].option} (CHF. {variation.price})</label>
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