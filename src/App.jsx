import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./utils/ScrollToTop";
import Error from "./components/layout/Error";
import { SnackbarProvider } from "notistack";
import Sidebar from "./pages/dashboard/components/layout/Sidebar";
import Home from "./pages/dashboard/sections/Home";
import Profile from "./pages/dashboard/sections/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AuthContextProvider from "./context/AuthContext";
import Guard from "./helpers/Guard";
import { ThemeProvider } from "@mui/material";
import { theme } from "./mui/theme";

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <AuthContextProvider>
              <Outlet />
              <ScrollToTop />
            </AuthContextProvider>
          </ThemeProvider>
        </SnackbarProvider>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: (
            <Guard>
              <Sidebar />
              <Outlet />
            </Guard>
          ),
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/profile",
              element: <Profile />,
            },
          ],
        },
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
  return <RouterProvider router={router} />;
}

export default App;
