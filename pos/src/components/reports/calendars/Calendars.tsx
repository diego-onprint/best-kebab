import { useEffect, useState, useRef } from "react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

const Calendars = ({ setOpen, handleCustomDate }) => {

    const containerRef = useRef()
    const initiallySelectedDate = new Date()
    const [selectedStartDate, setSelectedStartDate] = useState(initiallySelectedDate)
    const [selectedEndDate, setSelectedEndDate] = useState(initiallySelectedDate)

    useEffect(() => {

        const handleClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
        }

        setTimeout(() => {
            window.addEventListener("click", handleClick)
        }, 200)

        return () => window.removeEventListener("click", handleClick)

    }, [setOpen])

    const handleConfirm = () => {
        handleCustomDate({ start: format(selectedStartDate, 'yyyy-MM-dd'), end: format(selectedEndDate, 'yyyy-MM-dd')})
    }

    return (
        <div ref={containerRef} className="absolute top-[82px] right-0 p-3 rounded-md bg-white shadow-lg flex flex-col gap-2">
            <div className="flex">
                <DayPicker
                    mode="single"
                    selected={selectedStartDate}
                    onSelect={setSelectedStartDate}
                    classNames={{
                        head_cell: 'h-6',
                        day: 'w-6 h-6 flex items-center justify-center cursor-pointer text-sm',
                    }}
                />
                <DayPicker
                    mode="single"
                    selected={selectedEndDate}
                    onSelect={setSelectedEndDate}
                    classNames={{
                        head_cell: 'h-6',
                        day: 'w-6 h-6 flex items-center justify-center cursor-pointer text-sm',
                    }}
                />
            </div>
            <button onClick={handleConfirm} className="primary-button px-2 py-1 self-end">Bestätigen</button>
        </div>
    )
}

export default Calendars