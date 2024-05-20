import ProductsList from "../../components/products_list/ProductsList"
import ReturnButton from "../../components/common/return_button/ReturnButton"
import useParam from "../../hooks/useParam"

const Products = () => {

    const category = useParam("category")

    return (
        <div className={`${!category && "translate-x-full"} absolute top-0 right-0 w-screen h-screen transition-transform z-20 flex flex-col flex-1`}>
            <div className="section-header grid place-items-center relative min-h-16">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center">
                    <ReturnButton style="w-5 h-5" />
                </div>
                <h3 className="text-center font-semibold">Select a product</h3>
            </div>
            <ProductsList />
        </div>
    )
}

export default Products