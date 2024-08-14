import { useEffect, useRef } from "react"
import { ToastContainer, toast, Bounce } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import socket from "../socket"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { setSocketStatus } from "../store/socket/socketSlice"
// import { useGetTablesDataQuery, useGetTakeawayOrdersDataQuery } from "../store/api/apiSlice"
import { setCurrentOrder } from "../store/current_order/currentOrderSlice"
import usePrintTickets from "../hooks/usePrintTickets";
// import useRefetchOrderById from "../hooks/useRefetchOrderById";
import { getLocalStorageItem } from "../utils/local_storage/localStorage";
import useRefetchOrders from "../hooks/useRefetchOrders";
import useRefetchOrderById from "../hooks/useRefetchOrderById";
import { useGetScreenOrdersQuery } from "../store/api/apiSlice";

const SocketRegis = ({ children }) => {

  const audioRef = useRef(null)
  const dispatch = useDispatch<AppDispatch>()
  const { page, limit, condition } = useSelector(state => state.ordersPage)
  const user = getLocalStorageItem("user")
  const { handlePrint } = usePrintTickets()
  const { refetchOrdersByPage } = useRefetchOrders()
  const { refetchOrderById } = useRefetchOrderById()
  const { refetch: refetchScreenOders } = useGetScreenOrdersQuery()

  useEffect(() => {

    socket.emit("register-store", user?.username)

    const handleStatus = (args) => {
      if (args.success) dispatch(setSocketStatus(true))
    }

    const handleShopOrder = (args) => {

      if (args.success) {
        refetchOrderById(args.data.id)
        refetchOrdersByPage({ page, limit, condition })
        dispatch(setCurrentOrder(args.data.id))

        if (user?.username !== "screen") {

          if (audioRef.current) audioRef.current.play()

          setTimeout(() => {
            handlePrint("shop")
          }, 500)
  
          toast.success(`Neu Bestellung #${args.data.id}`, {
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
        }
      }
    }

    const handleUpdateScreen = async () => {
      const response = await refetchScreenOders()
      console.log(response)
    }

    // ONLY FOR RESTAURANT QR NOT TKW
    // const handleQrOrder = (args) => {
    //   if (args.success) {

    //     if (audioRef.current) audioRef.current.play()

    //     console.log(args)

    //     dispatch(setCurrentOrder(args.response.data.id))

    //     setTimeout(() => {
    //       handlePrint("shop")
    //     }, 500)

    //     toast.success(`Neu Bestellung Tisch ${args.response.data.id}`, {
    //       className: "dont-print",
    //       position: "top-center",
    //       autoClose: false,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       closeButton: false,
    //       onClick: () => audioRef.current.pause(),
    //       pauseOnHover: true,
    //       draggable: false,
    //       progress: undefined,
    //       theme: "light",
    //       transition: Bounce,
    //     })

    //     refetchOrderById(args.response.data.id)
    //     refetchTables()
    //   }
    // }

    socket.on("on-connect", handleStatus)
    socket.on("shop-order-created", handleShopOrder)
    socket.on("update-screen", handleUpdateScreen)

    return () => {
      socket.off("on-connect", handleStatus)
      socket.off("shop-order-created", handleShopOrder)
      socket.off("update-screen", handleUpdateScreen)
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