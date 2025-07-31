import axios from "../API/axios_config";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
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
        <div className="login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>

                <input
                    {...register("email", {
                        required: "Email is required",
                    })}
                    type="email"
                    placeholder="john@doe.com"
                />
                {errors.email && <p>{errors.email.message}</p>}

                <input
                    {...register("password", {
                        required: "Password is required",
                    })}
                    type="password"
                    placeholder="Enter password"
                />
                {errors.password && <p>{errors.password.message}</p>}

                <h3>OR</h3>
                <Link to="/register">Don't have an account? Register</Link>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
