import Spinner from '../spinner/Spinner'

const PageLoader = () => {
  return (
    <div className="w-full h-full grid place-items-center">
        <Spinner color={"text-zinc-300"} />
    </div>
  )
}

export default PageLoader