import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import avatarImg from "./images/avatar.jpg";
import { Link, useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // logout
    const handleLogout = () => {
        logout()
            .then(() => {
                // Sign-out successful.
                navigate("/");
            })
            .catch((error) => {
                console.log("Logout Failed", error);
            });
    };

    return (
        <div>
            <div className="drawer drawer-end z-50">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label
                        htmlFor="my-drawer-4"
                        className="drawer-button btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            {user.photoURL ? (
                                <img alt="" src={user.photoURL} />
                            ) : (
                                <img alt="" src={avatarImg} />
                            )}
                        </div>
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 min-h-40 text-base-content bg-white text-black">
                        {/* Sidebar content here */}
                        <li className="hover:bg-[#ff9933]">
                            <a href="/update-profile">Profile</a>
                        </li>
                        <li className="hover:bg-[#ff9933]">
                            <a href="/order">Order</a>
                        </li>

                        <li className="hover:bg-[#ff9933]">
                            <a>Settings</a>
                        </li>
                        <li className="hover:bg-[#ff9933]">
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="hover:bg-[#ff9933]">
                            <a onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
