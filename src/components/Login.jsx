import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [errorMessage, seterrorMessage] = useState("");
    const { signUpWithGmail, login } = useAuth();
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    //react hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        login(email, password)
            .then((result) => {
                // Signed in
                const user = result.user;
                const userInfo = {
                    name: data.name,
                    email: data.email,
                };

                alert("Login Successfull!");
                navigate(from, { replace: true });

                // console.log(user);
                // alert("Login successful!");
                // navigate(from);
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                seterrorMessage("Please provide valid email & password!");
            });
        reset();
    };

    // login with google
    const handleRegister = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                };

                alert("Login successful!");
                navigate("/");
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
            <div className="mb-5">
                <form
                    className="card-body"
                    method="dialog"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h3 className="font-bold text-lg text-black">
                        Please Login!
                    </h3>

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
                            {...register("password", { required: true })}
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

                    {/* show errors */}
                    {errorMessage ? (
                        <p className="text-red text-xs italic">
                            Provide a correct username & password.
                        </p>
                    ) : (
                        ""
                    )}

                    {/* submit btn */}
                    <div className="form-control mt-4">
                        <input
                            type="submit"
                            className="btn bg-green text-white bg-[#ff9933] border-none hover:bg-[#ff9933]"
                            value="Login"
                        />
                    </div>

                    {/* close btn */}
                    <Link to="/">
                        <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </div>
                    </Link>

                    <p className="text-center my-2 text-black">
                        Donot have an account?
                        <Link
                            to="/signup"
                            className="underline-none text-blue ml-1"
                        >
                            Signup Now
                        </Link>
                    </p>
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

export default Login;
