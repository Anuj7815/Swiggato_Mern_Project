import React from "react";
import bannerImg from "./images/banner.png";
import logo from "./images/Noodles.avif";
import pasta from "./images/Pasta.avif";
import { HiArrowCircleRight } from "react-icons/hi";
import { GiHotMeal } from "react-icons/gi";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
            <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8">
                {/* img */}
                <div className="md:w-1/2">
                    <img className="rounded-full" src={bannerImg} alt="" />
                    <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
                        <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64">
                            <img
                                src={pasta}
                                alt=""
                                className="rounded-sm w-20"
                            />
                            <div className="space-y-1 text-black font-">
                                <h5>Pasta</h5>
                                <div className="rating rating-sm">
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-500"
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-500"
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-500"
                                        checked
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-400"
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-400"
                                        readOnly
                                    />
                                </div>
                                <p className="text-[#ff3333]">Rs. 370</p>
                            </div>
                        </div>
                        <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-sm w-64 hidden">
                            <img
                                src={logo}
                                alt=""
                                className="rounded-sm w-20"
                            />
                            <div className="space-y-1 text-black">
                                <h5>Spicy noodles</h5>
                                <div className="rating rating-sm">
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-500"
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-500"
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-500"
                                        checked
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-400"
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-400"
                                        readOnly
                                    />
                                </div>
                                <p className="text-[#ff3333]">Rs.250</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* texts */}
                <div className="md:w-1/2 px-4 space-y-7">
                    <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug text-black">
                        Order Food or Book Table for your next{" "}
                        <div className="flex items-center space-x-5 text-[#ff3333]">
                            <span>Meal</span>
                            <GiHotMeal />
                        </div>
                    </h2>
                    <p className="text-gray-500 text-xl">
                        Your Daily Dose of Deliciousness Where Each Plate Waves
                        a Story of Culinary Mastery
                    </p>
                    <Link
                        to="/menu"
                        className="bg-[#ff9933] border-none hover:bg-[#ff3333] transition-left font-semibold btn text-white px-8 py-3 rounded-full"
                    >
                        Order Now <HiArrowCircleRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
