import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   add try and try block (exception handling) when ever async/await is being used
  async function signIn() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(auth?.currentUser?.email);

  return (
    <div className="form-container">
  <h2 className="form-title">Authentication</h2>
  
  <input
    type="email"
    placeholder="Email"
    className="form-input"
    onChange={(e) => setEmail(e.target.value)}
  />
  <input
    type="password"
    placeholder="Password..."
    className="form-input"
    onChange={(e) => setPassword(e.target.value)}
  />

  <div className="button-group">
    <button className="sign-in-btn" onClick={signIn}>Sign In</button>
    <button className="google-signin-btn" onClick={signInWithGoogle}>Sign In with Google</button>
    <button className="logout-btn" onClick={logOut}>Logout</button>
  </div>
</div>

  );
};

export default Auth;
