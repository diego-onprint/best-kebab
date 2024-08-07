import LoginForm from '../../components/login_form/LoginForm'

const Login = () => {
    return (
        <div className="relative z-50 overflow-hidden bg-white w-screen h-screen grid place-items-center">
            <div className="w-11/12 max-w-96 border flex flex-col items-center gap-10 border-zinc-200 rounded-xl shadow-lg p-8">
                <picture className="w-48 h-auto block object-contain">
                    <source srcSet="assets/login-logo.png" type="image/jpeg" />
                    <img src="assets/login-logo.png" alt="Description of the image" />
                </picture>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login