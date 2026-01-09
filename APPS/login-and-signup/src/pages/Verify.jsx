import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Verify() {
  const navigate = useNavigate();
  const location = useLocation();  //location.state: receives data from previous page (SignUp ORRR Login)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("OTP entered:", data.otp);

    alert("OTP Verified (UI Only)");
    navigate("/");                  //move to signup page or the page having path: '/'
  };

  return (
    <div className="auth-card">
      <h2 className="auth-header">Verify Code</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <input
          {...register("otp", {
            required: "OTP is required",
            pattern: {
              value: /^\d{6}$/,
              message: "OTP must be exactly 6 digits",
            },
          })}
          placeholder="Enter 6-digit code"
          className="auth-input"
          maxLength={6}
        />
        {errors.otp && <p className="auth-error">{errors.otp.message}</p>}

        <button type="submit" className="primary-btn">
          Verify
        </button>
      </form>

      <p className="auth-footer">
        Entered wrong number?{" "}
        <span
          className="link-text"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(location.state?.mode === "signup" ? "/" : "/login")
          }
        >
          Go back
        </span>
      </p>
    </div>
  );
}

export default Verify;
