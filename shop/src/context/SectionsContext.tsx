import { createContext, useContext, useState } from "react"

const SectionsContext = createContext(null)

export const useSectionsContext = () => useContext(SectionsContext)

const SectionsContextProvider = ({ children }) => {

    const [activeSection, setActiveSection] = useState("")

    return (
        <SectionsContext.Provider value={{activeSection, setActiveSection}}>{children}</SectionsContext.Provider>
    )
}

export default SectionsContextProvider