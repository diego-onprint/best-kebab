import { useSearchParams } from "react-router-dom"

const useParam = (param: string) => {
    const [searchParams] = useSearchParams()
    return searchParams.get(param)
}

export default useParam