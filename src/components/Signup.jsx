import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
    const { signUpWithGmail, createUser, updateUserProfile } = useContext(
        AuthContext
    );
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        // console.log(email, password)
        createUser(email, password)
            .then((result) => {
                // Signed up
                const user = result.user;
                updateUserProfile(data.email, data.photoURL).then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                    };

                    axiosPublic
                        .post("http://localhost:8080/users", userInfo)
                        .then((response) => {
                            // console.log(response);
                            alert("Signin successful!");
                            navigate(from, { replace: true });
                        });
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };

    //signup with google
    const handleRegister = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                };
                axiosPublic
                    .post("http://localhost:8080/users", userInfo)
                    .then((response) => {
                        // console.log(response);

                        alert("Signin successful!");
                        navigate("/");
                    });
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="max-w-md bg-white text-black w-full mx-auto flex items-center justify-center my-20">
            <div className="mb-5">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-lg">
                        Please Create An Account!
                    </h3>
                    {/* name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Name</span>
                        </label>
                        <input
                            type="name"
                            placeholder="Your name"
                            className="input input-bordered bg-white border-black"
                            {...register("name")}
                        />
                    </div>

                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered bg-white border-black"
                            {...register("email")}
                        />
                    </div>

                    {/* password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered bg-white border-black"
                            {...register("password")}
                        />
                        <label className="label">
                            <a
                                href="#"
                                className="label-text-alt link link-hover mt-2 text-black"
                            >
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    {/* error message */}
                    {/* <p>{errors.message}</p> */}

                    {/* submit btn */}
                    <div className="form-control mt-6">
                        <input
                            type="submit"
                            className="btn bg-green text-white bg-[#ff9933] border-none hover:bg-[#ff9933]"
                            value="Sign up"
                        />
                    </div>

                    <div className="text-center my-2">
                        Don't Have an account?
                        <Link to="/login">
                            <button className="ml-2 underline:none text-blue">
                                Login here
                            </button>
                        </Link>
                    </div>
                </form>
                <div className="text-center space-x-5">
                    <button
                        onClick={handleRegister}
                        className="btn btn-circle hover:bg-[#ff9933] hover:text-white bg-white text-black"
                    >
                        <FaGoogle />
                    </button>
                    <button className="btn btn-circle hover:bg-[#ff9933] hover:text-white bg-white text-black">
                        <FaFacebookF />
                    </button>
                    <button className="btn btn-circle hover:bg-[#ff9933] hover:text-white bg-white text-black">
                        <FaGithub />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
