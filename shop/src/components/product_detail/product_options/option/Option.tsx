import React from 'react'

const Option = ({ option, selectedOptions, setSelectedOptions }) => {

  const isSelected = selectedOptions.find(opt => opt.id === option.id)

  const handleClick = () => {
    if (!isSelected) {
      setSelectedOptions([...selectedOptions, option])
    } else {
      const filtered = selectedOptions.filter(opt => opt.id !== option.id)
      setSelectedOptions(filtered)
    }
  }

  return (
    <div className="flex justify-between items-center">
      <div className={`flex gap-2 ${isSelected && "font-bold"}`}>
        <p className="truncate max-w-52">{option.name}</p>
        <p>CHF. {option.price}</p>
      </div>
      <div
        onClick={handleClick}
        className={`w-4 h-4 rounded-sm flex items-center ${isSelected ? "border-none bg-red-500" : "border border-zinc-300"}`}
      >
        {
          isSelected ?
            <svg className="text-white font-semibold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg> : null
        }
      </div>
    </div>
  )
}

export default Option