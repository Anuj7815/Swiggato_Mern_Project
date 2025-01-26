import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUtensils } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";

const UpdateMenu = () => {
    const item = useLoaderData();
    console.log(item);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();

    // image hosting key
    const image_hosting_key =
        process.env.REACT_IMAGE_HOSTING_KEY ||
        "f4ae9d034b57307a80cd75b3cbdd7f23";
    // console.log(image_hosting_key)
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const onSubmit = async (data) => {
        // console.log(data)
        const imageFile = { image: data.image[0] };
        const hostingImg = await axiosPublic.post(
            image_hosting_api,
            imageFile,
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
        );
        // console.log(hostingImg.data)
        if (hostingImg.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: hostingImg.data.data.display_url,
            };

            console.log(menuItem);
            const postMenuItem = axiosSecure.patch(
                `/menu/${item._id}`,
                menuItem
            );

            reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your item updated successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/dashboard/manage-items");
        }
    };
    return (
        <div className="w-full md:w-[870px] px-4 mx-auto">
            <h2 className="text-2xl font-semibold my-4 text-black">
                Update This <span className="text-green">Menu Item</span>
            </h2>

            {/* form here */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">
                                Recipe Name*
                            </span>
                        </label>
                        <input
                            type="text"
                            defaultValue={item.name}
                            {...register("name", { required: true })}
                            placeholder="Recipe Name"
                            className="input input-bordered w-full text-black bg-white border-black"
                        />
                    </div>

                    {/* 2nd row */}
                    <div className="flex items-center gap-4">
                        {/* categories */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text text-black">
                                    Category*
                                </span>
                            </label>
                            <select
                                {...register("category", { required: true })}
                                className="select select-bordered text-black bg-white border-black"
                                defaultValue={item.category}
                            >
                                <option
                                    disabled
                                    value="default"
                                    className="text-black"
                                >
                                    Select a category
                                </option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="popular">Popular</option>
                            </select>
                        </div>

                        {/* prices */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">
                                    Price*
                                </span>
                            </label>
                            <input
                                type="number"
                                defaultValue={item.price}
                                {...register("price", { required: true })}
                                placeholder="Price"
                                className="input input-bordered w-full text-black bg-white border-black"
                            />
                        </div>
                    </div>

                    {/* 3rd row */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">
                                Recipe Details
                            </span>
                        </label>
                        <textarea
                            defaultValue={item.recipe}
                            {...register("recipe", { required: true })}
                            className="textarea textarea-bordered h-24 text-black bg-white border-black"
                            placeholder="Tell the worlds about your recipe"
                        ></textarea>
                    </div>

                    {/* 4th row */}
                    <div className="form-control w-full my-6">
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            className="file-input w-full max-w-xs text-black bg-white border-black"
                        />
                    </div>

                    <button className="btn bg-[#ff9933] border-none rounded-full hover:bg-[#ff9933] text-white px-6">
                        <FaUtensils /> Update Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMenu;
