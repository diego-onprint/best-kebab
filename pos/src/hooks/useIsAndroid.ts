import { useEffect, useState } from "react"
import UAParser from "ua-parser-js"

const useIsAndroid = () => {

    const [isAndroid, setIsAndroid] = useState(false)
    const [myOs, setMyOs] = useState(null)

    
    useEffect(() => {
        
        const parser = new UAParser(navigator.userAgent)
    
        const os = parser.getOS()

        setMyOs(os)
        setIsAndroid(os.name === "Linux" || os.name === "Android")

    }, [])

  return { isAndroid, myOs }
}

export default useIsAndroid