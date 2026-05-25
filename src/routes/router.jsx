import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login/Login";
import HomePage from "../pages/Home/HomePage";
import AddNumber from "../pages/AddNumber/AddNumber";
import Details from "../pages/Details/Details";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Receive from "../pages/Receive/Receive";
import PrivateRoute from "./PrivateRoute";
import ListTransaction from "../pages/ListTransaction/ListTransaction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-number",
        element: (
          <PrivateRoute>
            <AddNumber />
          </PrivateRoute>
        ),
      },
      {
        path: "/details",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/receive",
        element: (
          <PrivateRoute>
            <Receive />
          </PrivateRoute>
        ),
      },
      {
        path: "/transaction/:id",
        element: (
          <PrivateRoute>
            <ListTransaction />
          </PrivateRoute>
        ),
      },

      // public routes
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
