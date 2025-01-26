import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";

const Modal = () => {
    const [errorMessage, seterrorMessage] = useState("");
    const { signUpWithGmail, login } = useContext(AuthContext);

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
                // console.log(user);
                alert("Login successful!");
                navigate(from, { replace: true });
                document.getElementById("my_modal_5")?.close();
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
                navigate("/", { replace: true });
            })
            .catch((error) => console.log(error));
        document.getElementById("my_modal_5")?.close();
    };

    return (
        <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
            <div className="modal-box bg-white">
                <div className="modal-action flex-col justify-center mt-0">
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
                                <span className="label-text text-black">
                                    Email
                                </span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered bg-white text-black border-black"
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
                                className="input input-bordered bg-white text-black border-black"
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
                        <div
                            htmlFor="my_modal_5"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() =>
                                document.getElementById("my_modal_5")?.close()
                            }
                        >
                            ✕
                        </div>

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
                    <div className="text-center space-x-5 mb-5">
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
        </dialog>
    );
};

export default Modal;
