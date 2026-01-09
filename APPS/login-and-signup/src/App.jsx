import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import './App.css';

const router = createBrowserRouter([
  { path: "/", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/verify", element: <Verify /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
