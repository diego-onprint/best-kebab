import { useEffect, useState, useRef } from 'react'
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { parseReportsData } from '../../utils/parse/parseReportsData'
import Calendars from './calendars/Calendars'
import { getCurrentWeekDates } from '../../utils/get/getCurrentWeek'
import { getCurrentDay } from '../../utils/get/getCurrentDay'
import { getLastMonthDates } from '../../utils/get/getLastMonth'
import {
    useGetCurrentDayReportQuery,
    useGetCustomDatesReportMutation,
    useLazyGetLastMonthReportQuery,
    useLazyGetLastYearReportQuery,
    useLazyGetWeekReportQuery
} from '../../store/api/apiSlice'
import { getLastYearDates } from '../../utils/get/getLastYear'
import { formatDate } from '../../utils/format/formatDate'
import CSV from './csv/CSV'

const CurrentDataModel = {
    totalSales: "0",
    totalItems: 0,
    totalOrders: 0,
    totalTkwOrders: 0,
    totalOnsiteOrders: 0,
    cashOrders: { totalOrders: 0, totalSales: 0 },
    creditOrders: { totalOrders: 0, totalSales: 0 },
    twintOrders: { totalOrders: 0, totalSales: 0 },
    totalShipping: 0,
    totalTips: 0,
    totalCoupons: 0,
}

const ReportsDashboard = () => {

    const [openCalendars, setOpenCalendars] = useState(false)
    const initialDate = new Date()
    const [selectedDate, setSelectedDate] = useState(formatDate(initialDate))
    const [dataIndex, setDataIndex] = useState("today")
    const [currentData, setCurrentData] = useState(CurrentDataModel)
    const [rawData, setRawData] = useState([])
    const pdfRef = useRef()
    const { data: dayReportData, isLoading: isLoadingDayReport } = useGetCurrentDayReportQuery()
    const [getCustomDatesReport, { isLoading: isLoadingCustomDatesReport }] = useGetCustomDatesReportMutation()
    const [
        triggerGetWeekReport,
        {
            data: weekReportData,
            isLoading: isLoadingWeekReport,
            error: weekReportError
        }
    ] = useLazyGetWeekReportQuery()
    const [
        triggerGetLastMonthReport,
        {
            data: lastMonthReportData,
            isLoading: isLoadingLastMonthReport,
            error: lastMonthReportError
        }
    ] = useLazyGetLastMonthReportQuery()
    const [
        triggerGetLastYearReport,
        {
            data: lastYearReportData,
            isLoading: isLoadingLastYearReport,
            error: lastYearReportError
        }
    ] = useLazyGetLastYearReportQuery()

    const dataLoading = isLoadingDayReport || isLoadingWeekReport || isLoadingLastMonthReport || isLoadingLastYearReport || isLoadingCustomDatesReport

    const handleDownloadPdf = async () => {

        if (pdfRef.current) {

            try {

                const html = pdfRef.current
                const canvas = await html2canvas(html)
                const imgData = canvas.toDataURL("image/png")
                const pdf = new jsPDF("p", "mm", "a4")
                const imgProps = pdf.getImageProperties(imgData)
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('download.pdf');

            } catch (err) {
                console.log("Error generating PDF: ", err)
            }
        }
    }

    const handleLastYear = () => {
        const { firstDay, lastDay } = getLastYearDates()
        setSelectedDate(`${firstDay} - ${lastDay}`)
        triggerGetLastYearReport()
        setDataIndex("last year")
    }

    const handleLastMonth = () => {
        const { firstDay, lastDay } = getLastMonthDates()
        setSelectedDate(`${firstDay} - ${lastDay}`)
        triggerGetLastMonthReport()
        setDataIndex("last month")
    }

    const handleCurrentWeek = () => {
        const { startDate, endDate } = getCurrentWeekDates()
        setSelectedDate(`${startDate} - ${endDate}`)
        triggerGetWeekReport()
        setDataIndex("current week")
    }

    const handleToday = () => {
        const today = getCurrentDay()
        setSelectedDate(today)
        setDataIndex("today")
    }

    const handleCustomDate = async (selectedDates) => {
        setOpenCalendars(false)
        setSelectedDate(`${selectedDates.start} - ${selectedDates.end}`)
        const { data } = await getCustomDatesReport(selectedDates)
        const parsedData = parseReportsData(data.orders)
        setCurrentData(parsedData)
        setRawData(data.orders)
    }

    const handleCalendars = () => {
        setOpenCalendars(true)
        setDataIndex("custom")
    }

    useEffect(() => {

        if (dayReportData && dataIndex === "today") {
            const { data } = dayReportData
            const parsedData = parseReportsData(data)
            setCurrentData(parsedData)
            setRawData(data)
        }

        if (weekReportData && dataIndex === "current week") {
            const { data } = weekReportData
            const parsedData = parseReportsData(data)
            setCurrentData(parsedData)
            setRawData(data)
        }

        if (lastMonthReportData && dataIndex === "last month") {
            const { data } = lastMonthReportData
            const parsedData = parseReportsData(data)
            setCurrentData(parsedData)
            setRawData(data)
        }

        if (lastYearReportData && dataIndex === "last year") {
            const { data } = lastYearReportData
            const parsedData = parseReportsData(data)
            setCurrentData(parsedData)
            setRawData(data)
        }

    }, [dayReportData, weekReportData, lastMonthReportData, lastYearReportData, dataIndex])

    return (
        <div className="mt-6 flex flex-col gap-2 rounded-md overflow-hidden">
            <div className="grid grid-cols-12 divide-x divide-zinc-100">
                <div className="col-span-11 grid grid-cols-12 divide-x h-20 divide-zinc-100 bg-white">
                    <button onClick={handleLastYear} className={`col-span-3 ${dataIndex === "last year" && "bg-blue-500 text-white"}`}>Last Year</button>
                    <button onClick={handleLastMonth} className={`col-span-3 ${dataIndex === "last month" && "bg-blue-500 text-white"}`}>Last Month</button>
                    <button onClick={handleCurrentWeek} className={`col-span-3 ${dataIndex === "current week" && "bg-blue-500 text-white"}`}>This week</button>
                    <button onClick={handleToday} className={`col-span-3 ${dataIndex === "today" && "bg-blue-500 text-white"}`}>Today</button>
                </div>
                <div className="col-span-1 grid relative">
                    <button onClick={handleCalendars} className={`grid place-items-center ${dataIndex === "custom" ? "bg-blue-500 text-white" : " bg-white text-black"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                    </button>
                    {openCalendars ? <Calendars setOpen={setOpenCalendars} handleCustomDate={handleCustomDate} /> : null}
                </div>
            </div>
            {/* PRINTABLE AREA */}
            <div ref={pdfRef} className="flex flex-col gap-2">
                <div className={`${dataLoading ? "opacity-50" : ""} col-span-12 grid py-2 px-4 bg-white`}>
                    <p className="font-semibold">Datum: {selectedDate}</p>
                </div>
                <div className={`${dataLoading ? "opacity-50" : ""} col-span-12 grid grid-cols-12 divide-x divide-zinc-100 h-24 bg-white`}>
                    <div className="col-span-4 p-4 flex flex-col justify-center">
                        <dt>Total Sales</dt>
                        <dd className="text-xl font-semibold">CHF {currentData.totalSales}</dd>
                    </div>
                    <div className="col-span-4 p-4 flex flex-col justify-center">
                        <dt>Products</dt>
                        <dd className="text-xl font-semibold">{currentData.totalItems}</dd>
                    </div>
                    <div className="col-span-4 p-4 flex flex-col justify-center">
                        <dt>Orders</dt>
                        <dd className="text-xl font-semibold">{currentData.totalOrders}</dd>
                    </div>
                </div>
                <div className={`${dataLoading ? "opacity-50" : ""} col-span-12 grid grid-cols-12 divide-x divide-zinc-100 h-24 bg-white`}>
                    <div className="col-span-6 p-4 flex flex-col justify-center">
                        <dt>Lieferung / Abholung</dt>
                        <dd className="text-xl font-semibold">{currentData.totalTkwOrders}</dd>
                    </div>
                    <div className="col-span-6 p-4 flex flex-col justify-center">
                        <dt>Tisch</dt>
                        <dd className="text-xl font-semibold">{currentData.totalOnsiteOrders}</dd>
                    </div>
                </div>
                <div className={`${dataLoading ? "opacity-50" : ""} col-span-12 grid grid-cols-12 divide-x divide-zinc-100 h-24 bg-white`}>
                    <div className="col-span-4 px-4 py-2 flex flex-col justify-center">
                        <dt>Kreditkarten</dt>
                        <dd className="text text-zinc-500">{currentData.creditOrders.totalOrders} orders</dd>
                        <dd className="text-xl font-semibold">CHF {currentData.creditOrders.totalSales}</dd>
                    </div>
                    <div className="col-span-4 px-4 py-2 flex flex-col justify-center">
                        <dt>Barzahlung</dt>
                        <dd className="text text-zinc-500">{currentData.cashOrders.totalOrders} orders</dd>
                        <dd className="text-xl font-semibold">CHF {currentData.cashOrders.totalSales}</dd>
                    </div>
                    <div className="col-span-4 px-4 py-2 flex flex-col justify-center">
                        <dt>Twint</dt>
                        <dd className="text text-zinc-500">{currentData.twintOrders.totalOrders} orders</dd>
                        <dd className="text-xl font-semibold">CHF {currentData.twintOrders.totalSales}</dd>
                    </div>
                </div>
                <div className={`${dataLoading ? "opacity-50" : ""} col-span-12 grid grid-cols-12 divide-x divide-zinc-100 h-24 bg-white`}>
                    <div className="col-span-4 p-4 flex flex-col justify-center">
                        <dt>Shipping</dt>
                        <dd className="text-xl font-semibold">CHF {currentData.totalShipping}</dd>
                    </div>
                    <div className="col-span-4 p-4 flex flex-col justify-center">
                        <dt>Tips</dt>
                        <dd className="text-xl font-semibold">CHF {currentData.totalTips}</dd>
                    </div>
                    <div className="col-span-4 p-4 flex flex-col justify-center">
                        <dt>Coupons</dt>
                        <dd className="text-xl font-semibold">CHF {currentData.totalCoupons}</dd>
                    </div>
                </div>
            </div>
            {/* END PRINTABLE AREA */}
            <div className={`${dataLoading ? "opacity-50" : ""} col-span-12 flex gap-2`}>
                <button
                    onClick={handleDownloadPdf}
                    className="col-span-4 flex gap-2 bg-white p-2 rounded-md text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    PDF herunterladen
                </button>
                <CSV
                    currentData={currentData}
                    rawData={rawData}
                    selectedDate={selectedDate}
                />
            </div>
        </div>
    )
}

export default ReportsDashboard