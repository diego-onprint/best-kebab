import { useEffect, useState } from "react"
import Option from "../option/Option"

const OptionsMenu = ({ variation, handleSelected, selectedVariations }) => {

  const [isOpen, setOpen] = useState(false)

  useEffect(() => {

    const handleClick = (e) => {
      // console.log(e.target.className, typeof e.target.className)
    }

    window.addEventListener("click", handleClick)

    return () => window.removeEventListener("click", handleClick)

  }, [])

  return (
    <div key={variation.name} className="relative w-full">
      <button onClick={() => setOpen(!isOpen)} className="font-semibold bg-zinc-100 px-4 py-3 rounded-md">{variation.name}</button>
      <div className={`isMyMenu ${isOpen ? "block" : "hidden"} bg-white p-4 rounded-md shadow-md absolute top-9 z-30 max-h-72 overflow-auto`}>
        {
          variation.options.map(option => {
            return (
              <Option
                option={option}
                handleSelected={handleSelected}
                selectedVariations={selectedVariations}
                key={option.id}
                setOpen={setOpen}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default OptionsMenu