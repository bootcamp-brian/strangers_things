import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Root from "./pages/Root";
import NotFound from "./NotFound";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import PublicProfile from "./pages/PublicProfile";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
          {
            path: "posts",
            element: <Posts />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "posts/publicprofiles/:username",
            element: <PublicProfile />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
          {
            path: "/",
            element: <Home />,
          },
        ],
  },
]);

function App() {
  return (
      <div className="App">
          <RouterProvider router={router} />
      </div>
  )
}


export default App;
