import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Login data:", data);
    navigate("/verify", {
      state: {
        mode: "login",
        phone: data.phone,
      },
    });
  };

  return (
    <div className="auth-card">
      <h2 className="auth-header">Log In</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        
        <input
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+\d{10,15}$/,
              message: "Use international format e.g., +92300XXXXXXX",
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
        Don't have an account? <Link to="/" className="link-text">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
