//core
import { createBrowserRouter } from "react-router-dom";

//custom
import Home from "./pages/Home";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import Post from "./pages/Post";
import User from "./pages/User";
import { Protected } from "./components/shared/ProtectedRoutes/protected";
import Error from "./pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "user/:id",
    element: (
      <Protected>
        <User />
      </Protected>
    ),
  },
  {
    path: "post/:id",
    element: <Post />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
