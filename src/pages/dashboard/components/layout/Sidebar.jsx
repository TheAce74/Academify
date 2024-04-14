import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

function Sidebar({ showMenu = false, toggleMenu = () => "" }) {
  const location = useLocation();
  const activeUser = location.pathname.split("/")[1];

  const [adviserLinks] = useState([
    {
      name: "Dashboard",
      path: "/adviser",
    },
    {
      name: "Semesters",
      path: "/adviser/semesters",
    },
    {
      name: "Results",
      path: "/adviser/results",
    },
    {
      name: "Manage Students",
      path: "/adviser/manage",
    },
    {
      name: "Profile",
      path: "/adviser/profile",
    },
  ]);

  const [studentLinks] = useState([
    {
      name: "Dashboard",
      path: "/student",
    },
    {
      name: "Courses",
      path: "/student/courses",
    },
    {
      name: "Results",
      path: "/student/results",
    },
    {
      name: "Profile",
      path: "/student/profile",
    },
    {
      name: "Notification",
      path: "/student/notifications",
    },
  ]);
  
  const [parentLinks] = useState([
    {
      name: "Dashboard",
      path: "/parent",
    },
    {
      name: "Results",
      path: "/parent/result",
    },
    {
      name: "Profile",
      path: "/parent/profile",
    },
    {
      name: "Notification",
      path: "/parent/notifications",
    },
  ]);

  useEffect(() => {
    toggleMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div
      className={`fixed top-[10%] left-0 z-[200] bg-white transition-element overflow-y-auto md:translate-x-0 w-[300px] md:w-[260px] xl:w-[300px] h-full border border-r flex flex-col pt-14 ${showMenu ? "translate-x-[0px] shadow-xl" : "translate-x-[-300px]"}`}
    >
      {/* Course Adviser */}
      {activeUser === "adviser" && (
        <ul>
          {adviserLinks.map((link, index) => {
            return (
              <li
                key={index}
                className={`w-full transition-element mb-4 cursor-pointer hover:bg-[#ECECEC]`}
              >
                <NavLink to={link.path} end={link.name === "Dashboard"}>
                  <p className="pl-7 py-3">{link.name}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}

      {/* Student */}
      {activeUser === "student" && (
        <ul>
          {studentLinks.map((link, index) => {
            return (
              <li
                key={index}
                className={`w-full transition-element mb-4 cursor-pointer hover:bg-[#ECECEC]`}
              >
                <NavLink to={link.path} end={link.name === "Dashboard"}>
                  <p className="pl-7 py-3">{link.name}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}

      {/* Parent */}
      {activeUser === "parent" && (
        <ul>
          {parentLinks.map((link, index) => {
            return (
              <li
                key={index}
                className={`w-full transition-element mb-4 cursor-pointer hover:bg-[#ECECEC]`}
              >
                <NavLink to={link.path} end={link.name === "Dashboard"}>
                  <p className="pl-7 py-3">{link.name}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
