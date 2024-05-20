import { useState } from "react"
import useNavigation from "../../hooks/useNavigation"

const Landing = () => {

    const [ isStaff, setStaff ] = useState(false)
    const { toCategoriesView } = useNavigation()

    const handleStaffButton = () => setStaff(!isStaff)

    const handleAppButton = () => toCategoriesView()

    return (
        <div className="relative w-screen h-screen grid place-items-center">
            <img src="/landing-bg.jpg" alt="" className="absolute top-0 left-0 w-full h-full opacity-35 object-cover" />
            <div className="bg-white rounded-md p-10 flex flex-col gap-2 relative items-center">
                <h2 className="text-xl font-semibold">Wilkommen</h2>
                <img src="/logo.png" alt="" className="w-28 h-auto object-contain" />
                <p className="mt-4">Order with:</p>
                <div className="flex gap-4 mt-4">
                    <button onClick={handleStaffButton} className="flex-1 border-2 border-zinc-800 rounded-md p-5">
                        <svg className="w-10 h-10 text-zinc-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                        <span>Staff</span>
                    </button>
                    <button onClick={handleAppButton} className="flex-1 border-2 border-zinc-800 rounded-md p-5">
                        <svg className="w-10 h-10 text-zinc-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <span>App</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Landing