import { useState, useEffect } from "react"
import { socket } from "../socket"

const useSocketConnectionStatus = () => {

    const [socketConnected, setSocketConnected] = useState(false)
    
    useEffect(() => {
        
        const handleStatus = () => setSocketConnected(true)
        
        socket.on("on-connect", handleStatus)
    
        return () => {
          socket.off("on-connect", handleStatus)
        }
      }, [])


    return { socketConnected, setSocketConnected }
}

export default useSocketConnectionStatus