import { useNavigate } from "react-router-dom"
import useParam from "../../hooks/useParam"
import { formatOrderNumber } from "../../utils/formatOrderNumber"


const Success = () => {

    const navigate = useNavigate()
    const order = useParam("order")
    const email = useParam("email")
    const table = useParam("table")

    const handleNavigation = () => {

        if (table) {
            const queryParams = new URLSearchParams({ table }).toString()
            return navigate({
                pathname: "/",
                search: queryParams,
            })
        }

        return navigate("/")
    }

    return (
        <div className="min-h-screen min-w-screen grid place-items-center bg-zinc-100">
            <div className="w-11/12 max-w-xl overflow-hidden flex flex-col mx-auto bg-white shadow-md rounded-md">
                <picture className="w-full h-32 object-cover">
                    <source media="(min-width: 1024px)" srcSet="https://resto-demo.ch/wp-content/uploads/2024/06/hero-large-e1718890498941.jpg" />
                    <source media="(max-width: 1023px)" srcSet="https://resto-demo.ch/wp-content/uploads/2024/06/hero-large-e1718890498941.jpg" />
                    <img className="w-full h-full object-cover" src="https://resto-demo.ch/wp-content/uploads/2024/06/hero-large-e1718890498941.jpg" alt="" />
                </picture>
                <div className="p-4 flex flex-col gap-2 items-center">
                    <p className="text-xl font-semibold">Vielen Danke</p>
                    {
                        order ?
                            <>
                                <h1 className="text-center">Ihre Bestellnummer lautet: </h1>
                                <h2 className="text-2xl font-bold text-center">#{formatOrderNumber(order)}</h2>
                                <p className="text-center">We sent an email to: {email}</p>
                            </> : null
                    }
                    <button className="group" onClick={handleNavigation}>
                        <picture className="grid place-items-center">
                            <source type="image/webp" srcSet="/logo.webp" />
                            <source type="image/png" srcSet="/logo.png" />
                            <img className="w-32 h-32 object-contain" src="/logo.jpg" alt="" />
                        </picture>
                        <div className="flex items-center gap-1 group-hover:gap-2 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="relative top-[3px] size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            <span>neue Bestellung aufgeben</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Success