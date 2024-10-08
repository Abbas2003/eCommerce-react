import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ProductDetail() {

    const { id } = useParams()
    // console.log(params);
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(true)

    useEffect(() => {
        setNotFound(false)
        axios.get(`https://dummyjson.com/products/${id}`)
            .then((res) => {
                setProduct(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                setNotFound(true)
                console.log(err)
            })

    }, [])


    return (
        <section>
            {
                loading ?
                <h1 className="text-center text-3xl">Loading...</h1>
                :
                notFound ?
                <h1 className="text-center text-3xl">Product Not Found</h1>
                : 
                <div className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    {product.brand}
                                </h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                                    {product.title}
                                </h1>
                                <div className="flex mb-4">
                                    <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                                        Description
                                    </a>
                                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                                        Reviews
                                    </a>
                                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                                        Details
                                    </a>
                                </div>
                                <p className="leading-relaxed mb-4">
                                    {product.description}
                                </p>
                                <div className="flex border-t border-gray-200 py-2">
                                    <span className="text-gray-500">Color</span>
                                    <span className="ml-auto text-gray-900">Blue</span>
                                </div>
                                <div className="flex border-t border-gray-200 py-2">
                                    <span className="text-gray-500">Size</span>
                                    <span className="ml-auto text-gray-900">Medium</span>
                                </div>
                                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                    <span className="text-gray-500">Quantity</span>
                                    <span className="ml-auto text-gray-900">4</span>
                                </div>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        ${product.price}
                                    </span>
                                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 md:px-6 px-2 focus:outline-none hover:bg-indigo-600 rounded">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                            <img
                                alt="ecommerce"
                                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                src={product.thumbnail}
                            />
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}


export default ProductDetail;