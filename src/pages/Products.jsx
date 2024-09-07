import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryChip from "../components/CategoryChip";


function Products() {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [chosenCategory, setChosenCategory] = useState("All")

    useEffect(() => {
        const url = chosenCategory === "All" ?
            "https://dummyjson.com/products" :
            `https://dummyjson.com/products/category/${chosenCategory}`
        axios
            .get(url)
            .then((res) => {
                setProducts(res?.data?.products)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [chosenCategory])

    useEffect(() => {
        axios
            .get('https://dummyjson.com/products/categories')
            .then((res) => {
                // console.log("Category response =>", res.data)
                setCategories(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    return (
        <section className="container mx-auto">
            {loading ? (
                <h1 className="text-center text-3xl">Loading...</h1>
            ) : (
                <div>
                    <div className="flex flex-wrap mt-3 gap-2">
                        <CategoryChip
                            onClick={() => setCategories('All')}
                            isChosen={chosenCategory === 'All'}
                            category={{
                                slug: 'All',
                                name: 'All',
                            }} />
                        {categories.map((category) => (
                            <CategoryChip
                                onClick={() => setChosenCategory(category.slug)}
                                key={category.slug}
                                category={category}
                                isChosen={category.slug === chosenCategory}
                            />))}
                    </div>
                    <div className="flex flex-wrap -m-4 mt-5">
                        {products.map((item) => <ProductCard key={item.id} item={item} />)}
                    </div>
                </div>
            )}
        </section>
    )
}


export default Products;