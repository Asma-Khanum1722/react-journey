import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Verify from "./components/Verify";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/signup" />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
