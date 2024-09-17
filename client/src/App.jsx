import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { loader as genreLoader } from "./pages/Home";
import { SkeletonTheme } from "react-loading-skeleton";
import SignUp, { action as handleSignUp } from "./pages/SignUp";
import Login, { action as handleLogin } from "./pages/Login";
import Movies from "./pages/Movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <Home />, loader: genreLoader },
      { path: "/movies", element: <Movies /> },
      { path: "/login", element: <Login />, action: handleLogin },
      { path: "/signup", element: <SignUp />, action: handleSignUp },
    ],
  },
]);

function App() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <RouterProvider router={router} />
    </SkeletonTheme>
  );
}

export default App;
