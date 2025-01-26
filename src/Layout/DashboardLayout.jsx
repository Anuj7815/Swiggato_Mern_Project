import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
    FaEdit,
    FaLocationArrow,
    FaPlusCircle,
    FaQuestionCircle,
    FaRegUser,
    FaShoppingBag,
    FaUser,
} from "react-icons/fa";

import logo from "../components/images/SWIGGATO-modified.png";
import { FaCartShopping } from "react-icons/fa6";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLinks = (
    <>
        <li className="mt-3">
            <Link to="/">
                <MdDashboard /> Home
            </Link>
        </li>
        <li>
            <Link to="/menu">
                <FaCartShopping /> Menu
            </Link>
        </li>
        <li>
            <Link to="/order">
                <FaLocationArrow /> Orders Tracking
            </Link>
        </li>
        <li>
            <Link to="/menu">
                <FaQuestionCircle /> Customer Support
            </Link>
        </li>
    </>
);

const DashboardLayout = () => {
    const { loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    return (
        <div>
            {isAdmin ? (
                <div className="drawer sm:drawer-open bg-white">
                    <input
                        id="my-drawer-2"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                        {/* Page content here */}
                        <div className="flex items-center sm:items-center justify-between mx-4">
                            <label
                                htmlFor="my-drawer-2"
                                className="btn btn-primary drawer-button lg:hidden"
                            >
                                <MdDashboardCustomize />
                            </label>
                            <button className="btn rounded-full px-6 bg-[#ff9933] border-none flex items-center gap-2 text-white sm:hidden">
                                <FaRegUser /> Logout
                            </button>
                        </div>
                        <div className="mt-5 md:mt-2 mx-4">
                            <Outlet />
                        </div>
                    </div>

                    <div className="drawer-side">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu p-4 w-60 min-h-full bg-[#C1F1C6] text-black">
                            {/* Sidebar content here */}
                            <li>
                                <Link
                                    to="/dashboard"
                                    className="flex justify-start mb-3"
                                >
                                    <img src={logo} alt="" className="w-10" />
                                    <span className="badge badge-primary bg-[#ff9933] text-white border-none">
                                        Admin
                                    </span>
                                </Link>
                            </li>
                            <hr className="border-black" />
                            <li className="mt-3">
                                <Link to="/dashboard">
                                    <MdDashboard /> Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard">
                                    <FaShoppingBag /> Manage Bookings
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/add-menu">
                                    <FaPlusCircle />
                                    Add Menu
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manage-items">
                                    <FaEdit /> Manage Items
                                </Link>
                            </li>
                            <li className="mb-3">
                                <Link to="/dashboard/users">
                                    <FaUser /> All Users
                                </Link>
                            </li>

                            <hr className="border-black" />

                            {/* shared nav links */}
                            {sharedLinks}
                        </ul>
                    </div>
                </div>
            ) : loading ? (
                <Login />
            ) : (
                <div className="h-screen bg-white flex justify-center items-center">
                    <h1 className="text-black font-bold m-5">
                        You are Not Admin!
                    </h1>
                    <Link to="/">
                        <button className="btn bg-[#ff9933] rounded-full hover:bg-[#ff9933] border-none text-white">
                            Back to Home
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
