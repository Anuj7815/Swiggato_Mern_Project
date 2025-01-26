import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
// import Login from "../../../components/Login";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data = {} } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            // console.log(res.data);
            return res.data;
        },
    });

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    const users = data.users || [];

    // console.log(users);
    // console.log(users.length);
    // console.log(Array.isArray(users));

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
            alert(`${user.name} is now Admin`);
            refetch();
        });
    };

    const handleDeleteUser = (user) => {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
            alert(`${user.name} is now Deleted`);
            refetch();
        });
    };

    return (
        <div className="pl-10">
            <div className="flex items-center justify-between m-4">
                <h5>All Users</h5>
                <h5>Total users: {users.length}</h5>
            </div>

            {/* table */}
            <div>
                <div className="overflow-x-auto text-black">
                    <table className="table md:w-[870px]">
                        {/* head */}
                        <thead className="bg-[#ff9933] text-white rounded-lg">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(users) &&
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === "admin" ? (
                                                "Admin"
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleMakeAdmin(user)
                                                    }
                                                    className="btn btn-xs btn-circle bg-[#ff9933] text-white"
                                                >
                                                    <FaUsers />
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleDeleteUser(user)
                                                }
                                                className="btn btn-xs bg-red text-white"
                                            >
                                                {" "}
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
