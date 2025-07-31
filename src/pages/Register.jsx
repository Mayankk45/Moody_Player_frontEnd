import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "../API/axios_config";
import { toast } from "react-toastify";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        data.isAdmin = false;

        // calling API for register
        try {
            const response = await axios.post("/auth/register", data);
            console.log(response.data);
            toast.success("user registered successully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    };
    return (
        <div className="register">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Register</h1>
                <input
                    {...register("userName", {
                        required: "Username is required",
                    })}
                    type="text"
                    placeholder="enter user name"
                />
                {errors.userName && <p>{errors.userName.message}</p>}
                <input
                    {...register("email", {
                        required: "email is required",
                    })}
                    type="email"
                    placeholder="john@doe.com"
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    {...register("password", {
                        required: "password is required",
                    })}
                    type="password"
                    placeholder="enter password"
                />
                {errors.password && <p>{errors.password.message}</p>}

                <h3>OR</h3>
                <Link to="/login">Already have an account? Login</Link>

                <button>Submit</button>
            </form>
        </div>
    );
};

export default Register;
