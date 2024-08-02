
const Option = ({ option, handleSelected, selectedVariations, setOpen }) => {

    const index = selectedVariations.findIndex(selectedVariation => selectedVariation.option_id === option.option_id)
    const isSelected = index !== -1
    
    const handleClick = (e) => {
        // e.stopPropagation()
        handleSelected(option)
        setOpen(false)
    }

    return (
        <div className="flex gap-2 items-center">
            <button
                className={`clickable ${isSelected ? "bg-blue-500 text-white" : "bg-none"} p-2 rounded-md text-left`}
                onClick={handleClick}
            >
                {option.option_name} 
                {option.option_price !== 0 ? <span className="text-sm"> (CHF. {option.option_price.toFixed(2)})</span> : null}
            </button>
        </div>
    )
}

export default Option