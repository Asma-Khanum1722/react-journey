import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Initialize reCAPTCHA when component mounts
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => console.log("reCAPTCHA solved"),
        "expired-callback": () => {
          window.recaptchaVerifier = null;
          console.log("reCAPTCHA expired");
        }
      });
      // Pre-render the widget
      window.recaptchaVerifier.render().catch(console.error);
    }
    
    // Cleanup on unmount
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        } catch (e) {
          console.error("Failed to clear reCAPTCHA:", e);
        }
      }
    };
  }, []);

  const onSubmit = async (data) => {
    const { phone } = data;
    // Clean the phone number: remove spaces and any non-digit characters except '+'
    const cleanedPhone = phone.replace(/[^\d+]/g, '');
    const finalPhone = cleanedPhone.startsWith("+") ? cleanedPhone : `+${cleanedPhone}`;

    try {
      // Ensure reCAPTCHA verifier exists (render once)
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            // Reset reCAPTCHA when it expires
            window.recaptchaVerifier = null;
            console.log("reCAPTCHA expired");
          }
        });
      }

      try {
        // Ensure reCAPTCHA is rendered
        await window.recaptchaVerifier.render();
      } catch (renderErr) {
        console.error("reCAPTCHA render failed:", renderErr);
      }

      // Send OTP using the final phone number
      const confirmation = await signInWithPhoneNumber(auth, finalPhone, window.recaptchaVerifier);

      if (confirmation && confirmation.verificationId) {
        sessionStorage.setItem("verificationId", confirmation.verificationId);
      }

      // Navigate to verify screen (do not send the confirmation object)
      navigate("/verify", {
        state: { mode: "login", phone: finalPhone },
      });
    } catch (err) {
      console.error("signInWithPhoneNumber error:", err);
      alert(`Failed to send OTP. ${err && err.message ? err.message : 'Check phone number format.'}`);
    }
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
              message: "Enter phone in international format e.g., +92300xxxxxxx",
            },
          })}
          placeholder="Enter Phone (+92XXXXXXXXXX)"
          className="auth-input"
        />
        {errors.phone && <p className="auth-error">{errors.phone.message}</p>}

        <button type="submit" className="primary-btn">
          Send OTP
        </button>
        {/* reCAPTCHA container required by Firebase phone auth */}
        <div id="recaptcha-container"></div>
      </form>

      <p className="auth-footer">
        Don’t have an account? <Link to="/signup" className="link-text">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;