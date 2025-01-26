import React, { useContext, useState, useEffect } from "react";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const [cartItems, setCartItems] = useState([]);
    // console.log(cart.length);
    console.log(cartItems);

    // Calculate the total price for each item in the cart
    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    // Handle quantity increase
    const handleIncrease = async (item) => {
        try {
            const response = await fetch(
                `http://localhost:8080/cart-page/${item._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ quantity: item.quantity + 1 }),
                }
            );
            console.log(response);

            // if (response.ok) {
            //     const updatedCart = cartItems.map((cartItem) => {
            //         if (cartItem.id === item.id) {
            //             return {
            //                 ...cartItem,
            //                 quantity: cartItem.quantity + 1,
            //             };
            //         }
            //         return cartItem;
            //     });
            //     await refetch();
            //     setCartItems(updatedCart);
            // } else {
            //     console.error("Failed to update quantity");
            // }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };
    // Handle quantity decrease
    const handleDecrease = async (item) => {
        if (item.quantity > 1) {
            try {
                const response = await fetch(
                    `http://localhost:8080/cart-page/${item._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ quantity: item.quantity - 1 }),
                    }
                );
                // console.log(response);

                // if (response.ok) {
                //     const updatedCart = cartItems.map((cartItem) => {
                //         if (cartItem.id === item.id) {
                //             return {
                //                 ...cartItem,
                //                 quantity: cartItem.quantity - 1,
                //             };
                //         }
                //         return cartItem;
                //     });
                //     await refetch();
                //     setCartItems(updatedCart);
                // } else {
                //     console.error("Failed to update quantity");
                // }
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        }
    };

    // Calculate the cart subtotal
    const cartSubtotal = cart.reduce((total, item) => {
        return total + calculateTotalPrice(item);
    }, 0);

    // Calculate the order total
    const orderTotal = cartSubtotal;
    // console.log(orderTotal);

    // delete an item
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8080/cart-page/${item._id}`)
                    .then((response) => {
                        if (response) {
                            refetch();
                            Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    };

    return (
        <div className="max-w-screen-2xl mx-auto xl:px-24 px-4">
            {/* banner */}
            <div className=" bg-gradient-to-r from-[#ff9933] via-[#C1F1C6] to-[#ff9933]">
                <div className="py-28 flex flex-col items-center justify-center">
                    {/* content */}
                    <div className=" text-center px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug text-black">
                            Items Added to The
                            <span className="text-green"> Cart</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* cart table */}

            {cart.length >= 0 ? (
                <div>
                    <div className="">
                        <div className="overflow-x-auto">
                            <table className="table border border-black">
                                {/* head */}
                                <thead className="bg-[#C1F1C6] text-black rounded-sm">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Food</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => (
                                        <tr key={index} className="text-black">
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img
                                                            src={item.image}
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-medium">
                                                {item.name}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-xs bg-gray-200 text-black"
                                                    onClick={() =>
                                                        handleDecrease(item)
                                                    }
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={() =>
                                                        console.log(
                                                            item.quantity
                                                        )
                                                    }
                                                    className="w-10 mx-2 text-center overflow-hidden bg-gray-200"
                                                />
                                                <button
                                                    className="btn btn-xs bg-gray-200 text-black"
                                                    onClick={() =>
                                                        handleIncrease(item)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </td>
                                            <td>
                                                $
                                                {calculateTotalPrice(
                                                    item
                                                ).toFixed(2)}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm border-none text-red bg-transparent"
                                                    onClick={() =>
                                                        handleDelete(item)
                                                    }
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                {/* foot */}
                            </table>
                        </div>
                    </div>
                    <hr />

                    {/* Customer Details on Cart Page */}
                    <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8 text-black">
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

                        {/* shopping details */}
                        <div className="md:w-1/2 space-y-3">
                            <h3 className="text-lg font-semibold">
                                Shopping Details
                            </h3>
                            <p>Total Items: {cart.length}</p>
                            <p className="pb-3">
                                Total Price:{" "}
                                <span id="total-price">
                                    ${orderTotal.toFixed(2)}
                                </span>
                            </p>
                            <Link to="/process-checkout">
                                <button className="btn btn-md bg-[#ff9933] border-none rounded-full hover:bg-[#ff9933] text-white px-8 py-1">
                                    Procceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                // Back to Menu Button
                <div className="text-center mt-20">
                    <p>Cart is empty. Please add products.</p>
                    <Link to="/menu">
                        <button className="btn bg-[#ff9933] border-none hover:bg-[#ff9933] rounded-full text-white mt-3">
                            Back to Menu
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;
