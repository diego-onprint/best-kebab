import { useState, useEffect } from "react"
import { useGetCategoriesQuery } from "../../store/api/apiSlice"
import { useSectionsContext } from "../../context/SectionsContext"

const StickyScrollSpyNav = () => {

    const [categories, setCategories] = useState([])
    const { data } = useGetCategoriesQuery()
    const { activeSection, setActiveSection } = useSectionsContext()

    useEffect(() => {
        if (data) {
            const shopCategories = data.filter(category => category.parent.includes("shop"))
            setCategories(shopCategories)
        }
    }, [data])

    useEffect(() => {

        const container = document.getElementById("nav")
        const element = document.getElementById(`${activeSection}-nav`)

        if (container && element) {
            const containerRect = container.getBoundingClientRect()
            const elementRect = element.getBoundingClientRect()
            const containerScrollLeft = container.scrollLeft
            const elementLeftRelativeToContainer = elementRect.left - containerRect.left
            const newScrollLeft = containerScrollLeft + elementLeftRelativeToContainer - (containerRect.width / 2 - elementRect.width / 2)
            container.scrollTo({ top: 0, left: newScrollLeft, behavior: "smooth" })
        }

    }, [activeSection])

    const scrollToSection = (id) => {

        const section = document.getElementById(id)
        const offset = 70

        if (section) {
            const topPos = section.getBoundingClientRect().top + window.scrollY - offset
            // window.scrollTo({ top: topPos, behavior: "smooth" })
            window.scrollTo({ top: topPos })
        }
    }

    const scrollContainer = (direction) => {
        const container = document.getElementById("nav")
        if (container) {
            const scrollAmount = container.offsetWidth * 0.9; // Scroll amount set to 90% of container width
            const newScrollLeft = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({ top: 0, left: newScrollLeft, behavior: 'smooth' });
        }
    }

    return (
        <nav className="sticky top-0 z-50 bg-white shadow scroll-smooth">
            <div className="relative max-w-7xl grid grid-cols-12 gap-3 mx-auto py-2">
                <div className="col-span-12 sm:col-span-7 grid grid-cols-12">
                    <button onClick={() => scrollContainer("left")} className="hidden sm:block col-span-1 justify-self-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div className="col-span-12 sm:col-span-10 flex gap-2 items-center">
                        <div id="nav" className="snap-x snap-mandatory flex items-center flex-1 space-x-4 px-2 py-1 sm:py-0 overflow-x-auto scrollbar-hide">
                            {
                                categories.length > 0 ?
                                    categories.map(category => {
                                        return (
                                            <button
                                                onClick={() => scrollToSection(category.id)}
                                                id={`${category.id}-nav`}
                                                key={category.uid}
                                                className={`text-zinc-600 whitespace-nowrap snap-center py-2 px-4 rounded-full ${activeSection === category.id ? 'text-white bg-zinc-100' : ''}`}
                                            >
                                                {category.name}
                                            </button>
                                        )
                                    }) : null
                            }
                        </div>
                    </div>
                    <button onClick={() => scrollContainer("right")} className="hidden sm:block col-span-1 justify-self-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default StickyScrollSpyNav