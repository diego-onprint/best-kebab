const Notification = ({ 
    children,
    style = "bg-lime-500 text-white font-semibold"
}) => {
    return (
        <div className={`${style} fixed top-14 left-1/2 -translate-x-1/2 p-4 rounded-md shadow-lg z-[70]`}>
            {children}
        </div>
    )
}

export default Notification