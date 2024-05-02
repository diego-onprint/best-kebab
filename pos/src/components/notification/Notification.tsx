type PropsType = {
    message: string
    type?: "alert" | "success"
}

const Notification = ({ message, type = "success" }: PropsType) => {
    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-3 bg-white p-4 rounded-md shadow z-[900]">
            {
                type === "success" ?
                    <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg> : null
            }
            {
                type === "alert" ?
                    <svg className="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg> : null
            }
            <p>{message}</p>
        </div>
    )
}

export default Notification