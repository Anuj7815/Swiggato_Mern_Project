import React, { useContext, useEffect, useState } from "react";
import logo from "./images/SWIGGATO-modified.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const [isSticky, setSticky] = useState(false);
    const { user, loading } = useAuth();
    const [cart, refetch] = useCart();

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 0) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navItems = (
        <>
            <li className="text-black">
                <a href="/" className="text-black">
                    Home
                </a>
            </li>
            <li tabIndex={0} className="text-black">
                <a href="/menu" className="text-black">
                    Menu
                </a>
            </li>
            <li tabIndex={0} className="text-black">
                <a href="/order" className="text-black">
                    Order Tracking
                </a>
            </li>
            <li className="text-black">
                <a>Offers</a>
            </li>
        </>
    );
    return (
        <header
            className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}
        >
            <div
                className={`navbar xl:px-24 ${
                    isSticky
                        ? "shadow-md bg-[#ff9933] transition-all duration-300 ease-in-out"
                        : ""
                }`}
            >
                <div className="navbar-start">
                    <div className="dropdown justify-between">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-64 space-y-3"
                        >
                            {navItems}
                        </ul>
                    </div>
                    <a href="/">
                        <img src={logo} alt="" height="50" width="50" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{navItems}</ul>
                </div>
                <div className="navbar-end ">
                    {/* <button className="btn btn-ghost btn-circle hidden lg:flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button> */}

                    {/* shopping cart */}

                    {/* login button */}

                    {user ? (
                        <>
                            <Link to="/cart-page">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle  lg:flex items-center justify-center mr-3"
                                >
                                    <div className="indicator">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-black"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="badge badge-sm indicator-item bg-white text-black">
                                            {cart.length || 0}
                                        </span>
                                    </div>
                                </label>
                            </Link>
                            <Profile user={user} />
                        </>
                    ) : (
                        <div className="flex gap-5">
                            <Link
                                to="/login"
                                className="btn flex items-center gap-2 rounded-full px-6 bg-[#ff3333] border-none hover:bg-white hover:text-black text-white"
                            >
                                <FaRegUser /> Login
                            </Link>
                            <Link
                                to="/signup"
                                className="btn flex items-center gap-2 rounded-full px-6 bg-[#ff3333] border-none hover:bg-white hover:text-black text-white"
                            >
                                <FaRegUser /> Signup
                            </Link>
                        </div>
                    )}
                    <Modal />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
