import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Order = () => {
    const { user } = useAuth();
    // console.log(user?.email);
    const token = localStorage.getItem("access-token");

    const { refetch, data: orders = [] } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            const res = await fetch(
                `http://localhost:8080/payments?email=${user?.email}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.json();
        },
    });
    console.log(orders);
    const formatDate = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        return createdAtDate.toLocaleDateString();
    };
    return (
        <div className="max-w-screen-2xl conatiner mx-auto xl:px-24 px-30 py-16 bg-white">
            <div className="bg-gray-200">
                <div className="py-28 flex flex-col items-center justify-center">
                    {/* content */}
                    <div className=" text-center px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug text-black">
                            Track All your{" "}
                            <span className="text-[#ff9933]"> Orders</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* table */}
            <div>
                {orders.length > 0 ? (
                    <div>
                        <div className="">
                            <div className="overflow-x-auto border-black">
                                <table className="table">
                                    {/* head */}
                                    <thead className="bg-green text-black rounded-sm">
                                        <tr>
                                            <th>#</th>
                                            <th>Order Date</th>
                                            <th>Transaction ID</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="text-gray-500"
                                            >
                                                <td>{index + 1}</td>

                                                <td className="font-medium">
                                                    {formatDate(item.createdAt)}
                                                </td>
                                                <td>{item.transitionId}</td>
                                                <td>{item.price}</td>
                                                <td>{item.status}</td>
                                                {/* <td>${calculateTotalPrice(item).toFixed(2)}</td> */}
                                                <td>
                                                    <Link
                                                        to="/contact"
                                                        className="btn btn-sm border-none rounded-full text-white bg-[#ff9933] hover:bg-[#ff9933]"
                                                    >
                                                        Contact
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {/* foot */}
                                </table>
                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
                            <div className="md:w-1/2 space-y-3">
                                <h3 className="text-lg font-semibold">
                                    Customer Details
                                </h3>
                                <p>Name: {user?.displayName || "None"}</p>
                                <p>Email: {user?.email}</p>
                                <p>
                                    User_id:{" "}
                                    <span className="text-sm">{user?.uid}</span>
                                </p>
                            </div>
                            <div className="md:w-1/2 space-y-3">
                                <h3 className="text-lg font-semibold">
                                    Shopping Details
                                </h3>
                                <p>Total Orders: {orders.length}</p>
                                <p>
                                    Total Price:{" "}
                                    <span id="total-price">
                                        {/* ${orderTotal.toFixed(2)} */}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-20 text-black">
                        <p>You have not ordered anything!</p>
                        <Link to="/menu">
                            <button className="btn bg-[#ff9933] rounded-full border-none hover:bg-[#ff9933] text-white mt-3">
                                <IoArrowBackCircleSharp />
                                Back to Menu
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;
