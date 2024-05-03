
const Option = ({ option, handleSelected, selectedVariations, setOpen }) => {

    const index = selectedVariations.findIndex(selectedVariation => selectedVariation.id === option.id)
    const isSelected = index !== -1
    
    const handleClick = () => {
        handleSelected(option)
        // setOpen(false)
    }

    return (
        <div className="flex gap-2 items-center">
            <button
                className={`clickable ${isSelected ? "bg-zinc-200" : "bg-none"} p-2 rounded-md text-left`}
                onClick={handleClick}
            >
                {option.name} 
                <span className="text-sm"> (CHF. {option.price.toFixed(2)})</span>
            </button>
        </div>
    )
}

export default Option