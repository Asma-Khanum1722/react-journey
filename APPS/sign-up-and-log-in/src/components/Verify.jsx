import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

function Verify() {
  const location = useLocation();
  const state = location.state || {};
  const { mode, phone, name } = state;
  const confirmation = state.confirmation;
  // Fallback: verificationId persisted in sessionStorage when sending the SMS
  const storedVerificationId = sessionStorage.getItem("verificationId");
  const verificationId = confirmation && confirmation.verificationId ? confirmation.verificationId : storedVerificationId;
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      let result, user;

      if (confirmation && confirmation.confirm) {
        // Prefer using the ConfirmationResult if available (no page reload)
        result = await confirmation.confirm(otp);
        user = result.user;
      } else if (verificationId) {
        // Fallback when page was reloaded and ConfirmationResult was lost
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        result = await signInWithCredential(auth, credential);
        user = result.user;
      } else {
        setError("No verification available. Please retry signup/login.");
        setLoading(false);
        return;
      }

      if (mode === "signup") {
        // Save extra user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name,
          phone,
        });
      }

      // cleanup persisted verificationId
      sessionStorage.removeItem("verificationId");

      // OTP verified → redirect to dashboard/home
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-header">Verify OTP</h2>
      <p className="auth-subtext">Phone: {phone}</p>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="auth-input"
        maxLength={6}
      />

      <button onClick={handleVerify} className="primary-btn" disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {error && <p className="auth-error">{error}</p>}
    </div>
  );
}

export default Verify;