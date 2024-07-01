import { useEffect, useState } from "react"
import { useGetAllProductsQuery, useGetCategoriesQuery } from "../../store/api/apiSlice"
import Product from "./product/Product"
import { useSectionsContext } from "../../context/SectionsContext"

const ProductsList = () => {

    const [groupedProducts, setGroupedProducts] = useState([])
    const { data: categories } = useGetCategoriesQuery()
    const { data: allProducts } = useGetAllProductsQuery()
    const { setActiveSection } = useSectionsContext()

    useEffect(() => {
        if (categories && allProducts) {

            const shopCategories = categories.filter(category => category.parent.includes("shop"))

            const parsedProducts = shopCategories.map(category => {
                return {
                    title: category.name,
                    slug: category.id,
                    products: allProducts.filter(product => product.parent === category.id)
                }
            })

            setGroupedProducts(parsedProducts)
        }
    }, [categories, allProducts])

    useEffect(() => {
        const elementsToObserve = document.querySelectorAll('.observe')

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: .15
        }
    
        const handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }
    
        const observer = new IntersectionObserver(handleIntersect, options)
    
        elementsToObserve.forEach(element => {
            observer.observe(element);
        })

    }, [categories, groupedProducts, setActiveSection])

    return (
        <div>
            {
                groupedProducts.length > 0 ?
                    <div>
                        {
                            groupedProducts.map((group) => {
                                return (
                                    <section
                                        id={group.slug}
                                        key={group.slug}
                                        className="observe scroll-spy-section flex flex-col gap-3 p-3"
                                    >
                                        <h2 className="font-bold text-xl">{group.title}</h2>
                                        <div className="flex flex-col gap-2">
                                            {
                                                group.products.map(product => <Product product={product} key={product.id} />)
                                            }
                                        </div>
                                    </section>
                                )
                            })
                        }
                    </div> : null

            }
        </div>
    )
}

export default ProductsList