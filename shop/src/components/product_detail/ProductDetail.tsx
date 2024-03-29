import { Dispatch, SetStateAction } from "react"
import { Product } from "../../types"

type PropsTypes = {
    productDetails: Product | null
    setProductDetails: Dispatch<SetStateAction<Product | null>>
}

const ProductDetail = ({ productDetails, setProductDetails }: PropsTypes) => {

    console.log(productDetails)

    return (
        <div className={`${productDetails && "-translate-x-full"} transition-transform bg-white fixed top-0 -right-[100vw] w-[100vw] h-[100vh]`}>
            {
                productDetails ?
                    <div className="relative px-4 pt-12">
                        <img src={productDetails.images[0].src} alt="" className="rounded-xl h-40 w-full object-cover" />
                        <h2 className="text-2xl font-semibold">{productDetails.name}</h2>
                        <p>{productDetails.description.length !== 0 ? productDetails.description : productDetails.name}</p>
                        <p className="font-semibold text-xl">CHF. {productDetails.price}</p>
                        <button disabled={false} onClick={() => console.log(productDetails.id)} className="primary-button">Add to cart</button>
                        <span onClick={() => setProductDetails(null)} className="absolute left-4 top-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </span>
                    </div> : null
            }
        </div>
    )
}

export default ProductDetail