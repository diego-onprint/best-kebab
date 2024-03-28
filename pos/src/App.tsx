import { useEffect, useState, useRef } from "react"
import { socket } from "./socket"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/Dashboard"
import Categories from "./pages/categories/Categories"
import Products from "./pages/products/Products"
import Layout from "./components/layout/Layout"
import { useDispatch } from "react-redux"
import { setStatus } from "./store/status/statusSlice"
import type { AppDispatch } from "./store/store"
import Reports from "./pages/reports/Reports"
import QRious from "qrious"
import Orders from "./pages/orders/Orders"

// TODO dynamic imports!

type OrderNotification = {
  id: number
}

function App() {

  const dispatch = useDispatch<AppDispatch>()
  const [newOrdersNotifications, setNewOrdersNotifications] = useState<OrderNotification[]>([])
  const [newOrderId, setNewOrderId] = useState(0)

  const windowRef = useRef(window)

  const handleClose = (id: number) => {
    console.log("X")
    const filtered = newOrdersNotifications.filter(notification => notification.id !== id)
    setNewOrdersNotifications(filtered)
  }

  // console.log(newOrdersNotifications)

  useEffect(() => {
    if (newOrderId !== 0) {
      setNewOrdersNotifications(prev => [...prev, { id: newOrderId }])
    }
  }, [newOrderId])

  useEffect(() => {

    const notificationSound = new Audio("./notification.mp3")

    const onConnect = () => {
      console.log("connected to server")
      dispatch(setStatus({ status: true }))
    }

    const printOrder = (args) => {

      // EVENTUALLY REMOVE WHEN LOCAL AND TAKEAWAY ENDPOINTS DIFF
      if (!args.isStore) {
        setNewOrderId(args.data.id)
        notificationSound.play()
      }

      // console.log("print order! ARGS...", args)

      // GENERATE ADDRESS QR
      const address = args.data.shipping.address_1 || ""
      const postcode = args.data.shipping.postcode || ""
      const city = args.data.shipping.city || ""
      const country = args.data.shipping.country || ""
      const url = `https://www.google.com/maps/place/${address},+${postcode}+${city}+${country}`
      console.log("URL.....", url)
      const qr = new QRious({ value: url })
      const QRimage = qr.toDataURL()

      const items = args.data.line_items.map(item => {
        return `
          <div class="item">
            <div style="width: 25px;">${item.quantity}</div>
            <div style="flex: 1">${item.name}</div>
            <div>CHF.${item.price}</div>
          </div>
        `
      }).join('')

      const ticket = `
      <div>
        <div class="logo-container">
          <img class="logo" src="/assets/onprint-logo.png" alt="" />
        </div>
        <h2 class="title">OnPrint POS Demo</h2>
        <div class="company-details">
          <div>Dohlenweg 24,</div>
          <div>8050 Zürich</div>
          <div>Onprintmedia.ch</div>
          <div>info@onprintmedia.ch</div>
        </div>
        <div class="order-details">
          <div>Bestellung: #${args.data.id}</div>
          <div>Bestelldatum: ${args.data.date_created}</div>
        </div>
        <div class="items-list">
          <div class="table-header">
            <div style="width: 25px;">Qty</div>
            <div style="flex: 1;">Artikel</div>
            <div>Preis</div>
          </div>
          ${items}
        </div>
        <div class="item">
          <div>Rabatt</div>
          <div>CHF.0</div>
        </div>
        <div class="item">
          <div>Versandgebühr</div>
          <div>CHF.0</div>
        </div>
        <div class="item">
          <div class="emph">Gesamt</div>
          <div class="emph">CHF.${args.data.total}</div>
        </div>
        <div class="address-container">
          <div class="qr-container">
            <img src=${QRimage} alt="" className="w-9 h-9" />
          <div>
        </div>
      </div>
    `

    // <div>${address} ${postcode} ${city} ${country}}</div>

      const html = `
      <html>
        <head>
          <title>Print Receipt</title>
          <style>

          * {
            margin: 0;
            padding: 0;
          }

          body {
            padding: 25px;
          }

          .logo-container {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .logo {
            width: 120px;
            height: 120px;
            object-fit: contain;
          }

          .title {
            width: 100%;
            margin-bottom: 15px;
            text-align: center;
          }

          .company-details {
            margin-bottom: 7.5px;
            padding-bottom: 7.5px;
            border-bottom: 1px solid black;
          }

          .table-header {
            display: flex;
            gap: 5px;
          }

          .items-list {
            list-style-type: none;
            display: flex;
            flex-direction: column;
            flex-gap: 3px;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid black;
          }

          .item {
            display: flex;
            justify-content: space-between;
            gap: 5px;
          }

          .emph {
            font-weight: bold;
            font-size: 22px;
          }

          .address-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .qr-container {
            display: flex;
            justify-content: center;
            margin-top: 25px;
          }

          </style>
        </head>
        <body>
          ${ticket}
        </body>
      </html>
    `

      const printWindow = windowRef.current.open("")

      if (printWindow && ticket) {
        printWindow.document.write(html)
        printWindow.document.close()
        printWindow.print()
        printWindow.close()
      } else {
        console.error("Ocurrió un error al intentar imprimir la ventana")
      }
    }

    const handlePrintOrder = (args) => printOrder(args)

    socket.on("connect", onConnect)
    socket.on("new-order", handlePrintOrder)

    return () => {
      socket.off("connect", onConnect)
      socket.off("new-order", handlePrintOrder)
    }

  }, [dispatch])

  return (
    <Layout>

      <main className="@container/main flex-1 py-6 px-4 bg-indigo-50/50 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>

      {/* NOTIFICATIONS BAR */}
      <div className="absolute z-50 right-0 top-0 h-screen w-80 p-2 flex flex-col gap-2 pointer-events-none">
        {
          newOrdersNotifications.length !== 0 ?
            newOrdersNotifications.map(notification => {
              return (
                <div key={notification.id} onClick={() => handleClose(notification.id)} className="bg-white rounded-md p-3 shadow-md cursor-pointer pointer-events-auto">
                  <p>Tenes un nuevo pedido <span>[id: {notification.id}]</span></p>
                </div>
              )
            }) : null
        }
      </div>
    </Layout>
  )
}

export default App
