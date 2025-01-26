import React from "react";
import { Link } from "react-router-dom";

const categoryItems = [
    {
        id: 1,
        title: "Coffee",
        des: "15 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479966/Dhokla_puizbs.avif",
    },
    {
        id: 2,
        title: "Samosa",
        des: "27 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479968/Samosa_see0ok.avif",
    },
    {
        id: 3,
        title: "Pav Bhaji",
        des: "18 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479967/Pav_Bhaji_nnazft.avif",
    },
    {
        id: 4,
        title: "Dinner",
        des: "42 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479967/Rolls_wg9jz1.avif",
    },
    {
        id: 5,
        title: "All Categories",
        des: "102 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479967/Salad_t74fpg.avif",
    },
    {
        id: 6,
        title: "All Categories",
        des: "102 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479967/Noodles_ypxl1y.avif",
    },
    {
        id: 7,
        title: "All Categories",
        des: "102 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479967/Momo_rikm2w.avif",
    },
    {
        id: 8,
        title: "All Categories",
        des: "102 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479967/Pakoda_k3digw.avif",
    },
    {
        id: 9,
        title: "All Categories",
        des: "102 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479967/Pizza_ocfcjc.avif",
    },
    {
        id: 10,
        title: "All Categories",
        des: "102 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479966/Dosa_ddssqz.avif",
    },
    {
        id: 11,
        title: "All Categories",
        des: "102 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479966/Cake_o6oj1y.avif",
    },
    {
        id: 12,
        title: "All Categories",
        des: "102 Dishes",
        image:
            "https://res.cloudinary.com/dxbvabby5/image/upload/v1736479966/Pasta_ld3xwh.avif",
    },
];

const Catagories = () => {
    return (
        <div className="max-w-screen-2xl container bg-white mx-auto xl:px-24 px-4 py-16">
            <div className="text-center">
                <p className="subtitle">Customer Favorites</p>
                <h2 className="title">Popular Food Items</h2>
            </div>

            {/* category cards */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-5 justify-around items-center mt-12 ">
                {categoryItems.map((item, i) => (
                    <div
                        key={i}
                        className="text-center cursor-pointer hover:-translate-y-6 duration-300 transitopn-all"
                    >
                        <div className="w-50 mx-auto flex items-center justify-center">
                            <Link to="/menu">
                                <img
                                    src={item.image}
                                    alt=""
                                    className="bg-white p-5 rounded-full w-40 h-40"
                                />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catagories;
