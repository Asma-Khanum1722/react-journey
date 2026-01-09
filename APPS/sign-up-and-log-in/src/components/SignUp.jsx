import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useEffect } from "react";

function SignUp() {
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
    const { name, phone } = data;
    // Clean the phone number: remove spaces and any non-digit characters except '+'
    const cleanedPhone = phone.replace(/[^\d+]/g, '');
    // Ensure it starts with + (E.164). If user omitted +, prefix it.
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
        // continue - render may have already been done in some browsers
      }

      // Send OTP using the final phone number
      const confirmation = await signInWithPhoneNumber(auth, finalPhone, window.recaptchaVerifier);

      // Persist verificationId so the verify page can still work if user refreshes
      if (confirmation && confirmation.verificationId) {
        sessionStorage.setItem("verificationId", confirmation.verificationId);
      }

      // Navigate to verify — don't rely on passing the full confirmation object through navigation state
      navigate("/verify", {
        state: { mode: "signup", name, phone: finalPhone },
      });
    } catch (err) {
      console.error("signInWithPhoneNumber error:", err);
      alert(`Failed to send OTP. ${err && err.message ? err.message : 'Check phone number format.'}`);
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-header">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Enter Name"
          className="auth-input"
        />
        {errors.name && <p className="auth-error">{errors.name.message}</p>}

        <input
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+\d{10,15}$/,
              message: "Enter phone in international format e.g., +92300XXXXXXX",
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
        Already have an account? <Link to="/login" className="link-text">Log In</Link>
      </p>
    </div>
  );
}

export default SignUp;