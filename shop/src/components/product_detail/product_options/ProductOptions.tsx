import Option from "./option/Option"

const ProductOptions = ({
    variations,
    selectedOptions,
    setSelectedOptions,
}) => {
    return (
        <div className="flex flex-col divide-y divide-zinc-200 gap-1 bg-white rounded-md p-4">
            <h4 className="font-medium">Options</h4>
            <div className="flex flex-col gap-3 pt-2">
                {
                    variations.map(variation => {
                        return (
                            <div key={variation.id} className="flex flex-col gap-1">
                                <h4 className="font-semibold">{variation.name}</h4>
                                <div className="flex flex-col gap-1 pl-2">
                                    {
                                        variation.options.map(option => {
                                            return (
                                                <Option
                                                    key={option.id}
                                                    option={option}
                                                    selectedOptions={selectedOptions}
                                                    setSelectedOptions={setSelectedOptions}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductOptions