import { useEffect } from "react"
import Option from "../option/Option"

const OptionsMenu = ({ handleSelected, selectedVariations, setOpen, variation }) => {

    useEffect(() => {

        const handleClick = (e) => ![...e.target.classList].includes("clickable") && setOpen(false)

        window.addEventListener("click", handleClick)

        return () => window.removeEventListener("click", handleClick)

    }, [setOpen])


    return (
        <div className="clickable bg-white p-4 rounded-md shadow-md absolute top-9 z-30 max-h-72 overflow-auto">
            {
                variation.options.map(option => {
                    return (
                        <Option
                            key={option.id}
                            option={option}
                            handleSelected={handleSelected}
                            selectedVariations={selectedVariations}
                            setOpen={setOpen}
                        />
                    )
                })
            }
        </div>
    )
}

export default OptionsMenu