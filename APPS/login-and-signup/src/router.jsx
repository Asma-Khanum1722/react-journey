import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";

export const router = createBrowserRouter([
  { path: "/", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/verify", element: <Verify /> },
]);
