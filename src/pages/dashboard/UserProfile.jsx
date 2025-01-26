import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";

const UserProfile = () => {
    const { updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;

        updateUserProfile(name, photoURL)
            .then(() => {
                // Profile updated!
                alert("Profile updated successfully");
            })
            .catch((error) => {
                // An error occurred
                // ...
                console.log("Unable to Update the Profile", error.message);
            });
    };

    return (
        <div className="h-screen mx-auto flex items-center justify-center bg-gray-200">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            placeholder="Your name"
                            className="input input-bordered bg-white"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">
                                Upload Photo
                            </span>
                        </label>
                        <input
                            type="file"
                            {...register("photoURL")}
                            className="file-input w-full mt-1 bg-white"
                        />
                        {/* <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" required /> */}
                    </div>
                    <div className="form-control mt-6">
                        <input
                            type="submit"
                            value={"Update"}
                            className="btn bg-[#ff9933] border-none rounded-full hover:bg-[#ff9933] text-white"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
