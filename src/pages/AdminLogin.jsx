import axios from "../API/axios_config";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // calling API for login
        try {
            const res = await axios.post("/auth/login", data);
            const { userName, isAdmin } = res.data.user;
            localStorage.setItem(
                "moody_player_user",
                JSON.stringify({ userName, isAdmin })
            );
            toast.success("login successfully");
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="admin_login_wrapper">
            <div className="admin-login">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && (
                            <p className="error">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && (
                            <p className="error">{errors.password.message}</p>
                        )}
                    </div>

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
