import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup data:", data);

    // go to verify pageee
    navigate("/verify", {
      state: {
        mode: "signup",
        name: data.name,
        phone: data.phone,
      },
    });
  };

  return (
    <div className="auth-card">
      <h2 className="auth-header">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <input
          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^[A-Za-z]{4,10}$/,
              message: "Name must be 4–10 letters only",
            },
          })}
          placeholder="Enter Name"
          className="auth-input"
        />
        {errors.name && <p className="auth-error">{errors.name.message}</p>}

        <input
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+\d{10,15}$/,
              message:
                "Enter phone in international format e.g., +92300XXXXXXX",
            },
          })}
          placeholder="Enter Phone (+92XXXXXXXXXX)"
          className="auth-input"
        />
        {errors.phone && <p className="auth-error">{errors.phone.message}</p>}

        <button type="submit" className="primary-btn">
          Continue
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?{" "}
        <Link to="/login" className="link-text">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
