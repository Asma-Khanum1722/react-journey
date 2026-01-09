import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };


  const onSubmit = async (data) => {
    await delay(2);
    console.log(data);
  };

  return (
    <div className="form-container">
      {isSubmitting && <div className="loading">Submitting...</div>}
      <form
        className="signup-form"
        onSubmit={handleSubmit(onSubmit)}
        // autoComplete="off"

      >
        {/* username */}
        <label className="form-label">Username</label>
        <input
          {...register("username", {
            required: { value: true, message: "*Required" },
            minLength: { value: 3, message: "*Min length 3" },
            maxLength: { value: 12, message: "*Max length 12" },
          })}
          className="form-input"
          type="text"
          placeholder="Enter username"
        />
        {errors.username && (
          <p className="error-msg">{errors.username.message}</p>
        )}

        {/* email */}
        <label className="form-label">Email</label>
        <input
          {...register("email", {
            required: { value: true, message: "*Required" },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "*Invalid email format",
            },
          })}
          className="form-input"
          type="email"
          placeholder="Enter email"
        />
        {errors.email && <p className="error-msg">{errors.email.message}</p>}

        {/* password */}
        <label className="form-label">Password</label>
        <input
          {...register("password", {
            required: { value: true, message: "*Required" },
            minLength: { value: 8, message: "*At least 8 characters" },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
              message: "*Must contain 1 uppercase & 1 number",
            },
          })}
          className="form-input"
          type="password"
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="error-msg">{errors.password.message}</p>
        )}

        {/* confirm password */}
        <label className="form-label">Confirm Password</label>
        <input
          {...register("confirmPassword", {
            required: { value: true, message: "*Required" },
            validate: (value) =>
              value === watch("password") || "*Passwords do not match",
          })}
          className="form-input"
          type="password"
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <p className="error-msg">{errors.confirmPassword.message}</p>
        )}

        <button disabled={isSubmitting} className="submit-btn" type="submit">
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default App;
