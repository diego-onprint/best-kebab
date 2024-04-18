import { useState } from "react"
import OptionsMenu from "../options_menu/OptionsMenu"

const VariationButton = ({ variation, handleSelected, selectedVariations }) => {

  const [isOpen, setOpen] = useState(false)

  // If selected, display name of option
  const selected = selectedVariations.find(selectedVariation => selectedVariation.parent === variation.id)

  return (
    <div key={variation.name} className="relative col-span-4">
      <button
        onClick={() => !isOpen ? setTimeout(() => setOpen(true), 20) : setOpen(false)}
        className={`${isOpen && "clickable"} ${selected ? "bg-green-300" : "bg-zinc-100 text-zinc-500"} w-full font-semibold px-4 py-3 rounded-md flex justify-between items-center relative`}
      >
        <span className="truncate pointer-events-none">{variation.name}</span>
        <svg className="pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </button>
      {
        isOpen ?
          <OptionsMenu
            handleSelected={handleSelected}
            selectedVariations={selectedVariations}
            setOpen={setOpen}
            variation={variation}
          /> : null
      }
    </div>
  )
}

export default VariationButton