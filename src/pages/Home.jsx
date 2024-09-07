import { h1, section } from "framer-motion/client";
import { Link } from "react-router-dom";

function Home(){
    return(
        <section className="    ">
            <img src="https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories-vector-isolated-concept-metaphor-illustration_335657-2764.jpg?w=740&t=st=1725600328~exp=1725600928~hmac=cc2f80740f22994b47d9b850a69cbe375addedf287696e5bb425e63df90e876c" className="relative" />
            <Link to={'/products'} className="px-6 text-4xl py-3 bg-purple-400 hover:bg-purple-600 hover:text-white absolute md:top-[450px] md:right-[230px] right-0 top-50" >Browse all Products</Link>
        </section>
    )
}



export default Home;