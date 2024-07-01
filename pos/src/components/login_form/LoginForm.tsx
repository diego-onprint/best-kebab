import { useRef, useState } from "react"
import Spinner from "../common/spinner/Spinner"
import { useLoginMutation } from "../../store/api/apiSlice"
import { setLocalStorageItem } from "../../utils/local_storage/localStorage"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {

    const navigate = useNavigate()
    const data = useRef({ username: "", password: "" })
    const [error, setError] = useState("")
    const [login, { isLoading }] = useLoginMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await login(data.current)

        if (response.data?.error) {
            setError(response.data.error.msg)
            setTimeout(() => { setError("") }, 5000)
        } 

        // console.log(response)

        // TEMP until solver CORS issue and headeres in requests
        if (response.data.success) {
            setLocalStorageItem("user", { auth: true })
            navigate("/")
        }
    }

    const handleChange = (e) => data.current[e.target.name] = e.target.value

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-2">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
            </div>
            <div className="relative flex">
                {/* {
                    error.length > 0 ?
                    <p className="absolute -top-7 text-red-500">hola</p> :
                    null
                } */}
                <button type="submit" className="primary-button flex-1">
                    {
                        !isLoading ?
                            "Anmeldung" :
                            <Spinner />
                    }
                </button>
            </div>
        </form>

    )
}

export default LoginForm