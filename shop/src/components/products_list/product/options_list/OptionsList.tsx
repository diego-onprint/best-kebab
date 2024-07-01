import { useEffect, useRef } from "react"
import { createTimestamp } from "../../../../utils/createTimestamp"

const OptionsList = ({ options, variations, setVariations, setOpen }) => {

  const listRef = useRef(null)

  const handleSelect = (option) => {
    const uid = createTimestamp()
    const parsedOption = { ...option, uid }
    setVariations([...variations, parsedOption])
    setOpen(false)
  }

  useEffect(() => {

    // const handleClickOutside = (e) => {
    //   console.log(e.target)
    //   if (listRef.current && !listRef.current.contains(e.target)) {
    //     console.log("lkfhds")
    //   }
    // }

    // window.addEventListener("click", handleClickOutside)

    // return () => {
    //   window.removeEventListener("click", handleClickOutside)
    // }

  }, [])

  return (
    <div className="absolute top-14 left-0 bg-white w-full flex flex-col gap-3 z-30 rounded-md shadow-2xl px-6 py-2 max-h-52 overflow-auto divide-y divide-zinc-200">
      {
        options.map(option => {
          return (
            <button
              onClick={() => handleSelect(option)}
              className="pt-2 flex justify-between"
              key={option.option_id}
            >
              <span className="flew-1 overflow-hidden truncate">{option.option_name}</span>
              <span>CHF {option.option_price}</span>
            </button>
          )
        })
      }
    </div>
  )
}

export default OptionsList