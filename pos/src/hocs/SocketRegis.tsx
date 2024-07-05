import { useEffect, useRef } from "react"
import { ToastContainer, toast, Bounce } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { socket } from "../socket"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { setSocketStatus } from "../store/socket/socketSlice"
import { useGetTakeawayOrdersDataQuery } from "../store/api/apiSlice"
import { setCurrentOrder } from "../store/current_order/currentOrderSlice"
import usePrintTickets from "../hooks/usePrintTickets";

const SocketRegis = ({ children }) => {

  const audioRef = useRef(null)
  const dispatch = useDispatch<AppDispatch>()
  const { refetch } = useGetTakeawayOrdersDataQuery()
  const { handlePrint } = usePrintTickets()

  useEffect(() => {

    const handleStatus = (args) => {
      if (args.success) dispatch(setSocketStatus(true))
    }

    const handleShopOrder = (args) => {

      if (args.success) {

        if (audioRef.current) audioRef.current.play()

        dispatch(setCurrentOrder(args.data.data.id))

        setTimeout(() => {
          handlePrint("shop")
        }, 500)

        toast.success(`Neu Bestellung #${args.data.data.id}`, {
          className: "dont-print",
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          closeButton: false,
          onClick: () => audioRef.current.pause(),
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
        
        refetch()
      }
    }

    const handleQrOrder = (args) => {
      console.log(args)
    }

    socket.on("on-connect", handleStatus)
    socket.on("shop-order-created", handleShopOrder)
    socket.on("qr-order-updated", handleQrOrder)

    return () => {
      socket.off("on-connect", handleStatus)
      socket.off("shop-order-created", handleShopOrder)
      socket.off("qr-order-updated", handleQrOrder)
    }
  }, [])

  return (
    <>
      {children}
      <audio ref={audioRef} src="/notification.mp3" loop />
      <ToastContainer />
    </>
  )
}

export default SocketRegis