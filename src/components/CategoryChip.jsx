
    function CategoryChip({ category, isChosen, onClick }){

    const {name} = category

    return(
        <section onClick={onClick} className={`${isChosen ? "bg-green-300 text-white" : "bg-white text-black"}py-3 px-4 rounded-md border border-green-400 hover:bg-green-100 cursor-pointer`}>
            <h1>{name}</h1>
        </section>
    )
}


export default CategoryChip;