import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./utils/ScrollToTop";
import Error from "./components/layout/Error";
import { SnackbarProvider } from "notistack";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AuthContextProvider from "./context/AuthContext";
import Guard from "./helpers/Guard";
import { ThemeProvider } from "@mui/material";
import { theme } from "./mui/theme";
import MenuTogglerWrapper from "./helpers/MenuTogglerWrapper";

// Adviser
import AdviserDashboard from "./pages/dashboard/adviser/sections/Dashboard";
import AdviserSemester from "./pages/dashboard/adviser/sections/Semester";
import AdviserResults from "./pages/dashboard/adviser/sections/Results";
import AdviserManageStudents from "./pages/dashboard/adviser/sections/ManageStudents";
import AdviserProfile from "./pages/dashboard/adviser/sections/Profile";
import AdviserViewSemester from "./pages/dashboard/adviser/sections/ViewSemester";
import AdviserMessages from "./pages/dashboard/adviser/sections/Messages";

// Student
import StudentDashboard from "./pages/dashboard/student/sections/Dashboard";
import StudentCourses from "./pages/dashboard/student/sections/Courses";
import StudentCoursesView from "./pages/dashboard/student/sections/ViewCourses";
import StudentResults from "./pages/dashboard/student/sections/Results";
import StudentProfile from "./pages/dashboard/student/sections/Profile";
import StudentNotifications from "./pages/dashboard/student/sections/Notifications";
import StudentRegisterCourses from "./pages/dashboard/student/sections/RegisterCourses";
import StudentMessages from "./pages/dashboard/student/sections/Messages";

// Parent
import ParentDashboard from "./pages/dashboard/parent/sections/Dashboard";
import ParentResult from "./pages/dashboard/parent/sections/Result";
import ParentProfile from "./pages/dashboard/parent/sections/Profile";
import ParentNotification from "./pages/dashboard/parent/sections/Notifications";
import ParentMessages from "./pages/dashboard/parent/sections/Messages";

// Coordinator
import CoordinatorDashboard from "./pages/dashboard/coordinator/sections/Dashboard";
import CoordinatorProfile from "./pages/dashboard/coordinator/sections/Profile";
import CoordinatorCourses from "./pages/dashboard/coordinator/sections/Courses";

import AdviserContextProvider from "./context/AdviserContext";
import CoordinatorContextProvider from "./context/CoordinatorContext";
import StudentContextProvider from "./context/StudentContext";
import ParentContextProvider from "./context/ParentContext";

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
              <AdviserContextProvider>
                <CoordinatorContextProvider>
                  <StudentContextProvider>
                    <ParentContextProvider>
                      <MenuTogglerWrapper />
                      <div className="w-full p-5 ml-auto xl:w-[calc(100%_-22em)] md:w-[calc(100%_-17em)] md:p-8 md:pr-20 md:pt-[3.5em]">
                        <Outlet />
                      </div>
                    </ParentContextProvider>
                  </StudentContextProvider>
                </CoordinatorContextProvider>
              </AdviserContextProvider>
            </Guard>
          ),
          children: [
            {
              path: "/adviser",
              element: (
                <>
                  <Outlet />
                </>
              ),
              children: [
                {
                  path: "/adviser",
                  element: <AdviserDashboard />,
                },
                {
                  path: "/adviser/semesters",
                  element: <AdviserSemester />,
                },
                {
                  path: "/adviser/semesters/view",
                  element: <AdviserViewSemester />,
                },
                {
                  path: "/adviser/results",
                  element: <AdviserResults />,
                },
                {
                  path: "/adviser/manage",
                  element: <AdviserManageStudents />,
                },
                {
                  path: "/adviser/profile",
                  element: <AdviserProfile />,
                },
                {
                  path: "/adviser/messages",
                  element: <AdviserMessages />,
                },
              ],
            },
            {
              path: "/student",
              element: (
                <>
                  <Outlet />
                </>
              ),
              children: [
                {
                  path: "/student",
                  element: <StudentDashboard />,
                },
                {
                  path: "/student/courses",
                  element: <StudentCourses />,
                },
                {
                  path: "/student/courses/view",
                  element: <StudentCoursesView />,
                },
                {
                  path: "/student/courses/register",
                  element: <StudentRegisterCourses />,
                },
                {
                  path: "/student/results",
                  element: <StudentResults />,
                },
                {
                  path: "/student/profile",
                  element: <StudentProfile />,
                },
                {
                  path: "/student/notifications",
                  element: <StudentNotifications />,
                },
                {
                  path: "/student/messages",
                  element: <StudentMessages />,
                },
              ],
            },
            {
              path: "/parent",
              element: (
                <>
                  <Outlet />
                </>
              ),
              children: [
                {
                  path: "/parent",
                  element: <ParentDashboard />,
                },
                {
                  path: "/parent/result",
                  element: <ParentResult />,
                },
                {
                  path: "/parent/profile",
                  element: <ParentProfile />,
                },
                {
                  path: "/parent/notifications",
                  element: <ParentNotification />,
                },
                {
                  path: "/parent/messages",
                  element: <ParentMessages />,
                },
              ],
            },
            {
              path: "/coordinator",
              element: (
                <>
                  <Outlet />
                </>
              ),
              children: [
                {
                  path: "/coordinator",
                  element: <CoordinatorDashboard />,
                },
                {
                  path: "/coordinator/profile",
                  element: <CoordinatorProfile />,
                },
                {
                  path: "/coordinator/courses",
                  element: <CoordinatorCourses />,
                },
              ],
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
