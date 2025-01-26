import React from "react";
import { HiArrowCircleRight } from "react-icons/hi";

const serviceLists = [
    {
        id: 1,
        title: "Catering",
        des: "Delight your guests with our flavors and  presentation",
        img: "/images/services/pizzaBanner.jpg",
    },
    {
        id: 2,
        title: "Fast delivery",
        des: "We deliver your order promptly to your door",
        img: "/images/services/Delivery.jpeg",
    },
    {
        id: 3,
        title: "Online Ordering",
        des: "Explore menu & order with ease using our Online Ordering n",
        img: "/images/services/Order Tracking.jpeg",
    },
    {
        id: 4,
        title: "Table Booking",
        des: "Give the gift of exceptional dining with Foodi Gift Cards",
        img: "/images/services/restaurant.jpeg",
    },
];

const OurServices = () => {
    return (
        <div className="section-container py-16 bg-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                    <div className="text-left md:w-4/5">
                        <p className="subtitle">What We Offer</p>
                        <h2 className="title">
                            Our Culinary Services With Just One Click
                        </h2>
                        <p className="my-5 text-secondary leading-[30px]">
                            "Rooted in passion, we curate unforgettable dining
                            experiences and offer exceptional services, blending
                            culinary artistry with warm hospitality."
                        </p>

                        <button className="bg-[#ff9933] border-none hover:bg-[#ff3333] font-semibold btn text-white px-8 py-3 rounded-full">
                            Explore <HiArrowCircleRight />
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                        {serviceLists.map((service) => (
                            <div
                                key={service.id}
                                className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 cursor-pointer hover:border hover:border-white transition-all duration-200"
                            >
                                <img
                                    src={service.img}
                                    alt=""
                                    className=" mx-auto w-20 h-20 rounded-sm"
                                />
                                <h5 className="pt-3 font-semibold text-black">
                                    {" "}
                                    {service.title}
                                </h5>
                                <p className="text-gray">{service.des}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;
