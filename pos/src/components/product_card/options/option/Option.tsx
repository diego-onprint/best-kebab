
const Option = ({ option, handleSelected, selectedVariations }) => {

    const index = selectedVariations.findIndex(selectedVariation => selectedVariation.id === option.id)
    const isSelected = index !== -1 ? true : false
    
    return (
        <div className="flex gap-2 items-center">
            <button
                className={`${isSelected ? "bg-zinc-200" : "bg-none"} p-2 rounded-md text-left`}
                onClick={() => handleSelected(option)}
            >
                {option.name}
            </button>
        </div>
    )
}

export default Option