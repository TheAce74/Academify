import { useState, useEffect, useRef } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useClickAway } from "../../../../hooks/useClickAway";

function Sidebar({ showMenu = false, toggleMenu = () => false }) {
  const location = useLocation();
  const activeUser = location.pathname.split("/")[1];
  const clickAwayRef = useRef(null);

  const [adviserLinks] = useState([
    {
      name: "Dashboard",
      path: "/adviser",
    },
    {
      name: "Semesters",
      path: "/adviser/semesters",
    },
    // {
    //   name: "Results",
    //   path: "/adviser/results",
    // },
    {
      name: "Manage Students",
      path: "/adviser/manage",
    },
    {
      name: "Profile",
      path: "/adviser/profile",
    },
    {
      name: "Messages",
      path: "/adviser/messages",
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
    {
      name: "Messages",
      path: "/student/messages",
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
    {
      name: "Messages",
      path: "/parent/messages",
    },
  ]);

  const [coordinatorLinks] = useState([
    {
      name: "Dashboard",
      path: "/coordinator",
    },
    {
      name: "Profile",
      path: "/coordinator/profile",
    },
    {
      name: "Courses",
      path: "/coordinator/courses",
    },
  ]);

  useClickAway(clickAwayRef, () => toggleMenu(false));

  useEffect(() => {
    toggleMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div
      className={`fixed top-[10%] font-jakarta left-0 z-[200] bg-white transition-element overflow-y-auto md:translate-x-0 w-[300px] md:w-[260px] xl:w-[300px] h-full border border-r flex flex-col pt-14 ${showMenu ? "translate-x-[0px] shadow-xl" : "translate-x-[-300px]"}`}
      ref={clickAwayRef}
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
                  <p className="pl-10 lg:pl-16 py-3">{link.name}</p>
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
                  <p className="pl-10 lg:pl-16 py-3">{link.name}</p>
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
                  <p className="pl-10 lg:pl-16 py-3">{link.name}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}

      {/* Coordinators */}
      {activeUser === "coordinator" && (
        <ul>
          {coordinatorLinks.map((link, index) => {
            return (
              <li
                key={index}
                className={`w-full transition-element mb-4 cursor-pointer hover:bg-[#ECECEC]`}
              >
                <NavLink to={link.path} end={link.name === "Dashboard"}>
                  <p className="pl-10 lg:pl-16 py-3">{link.name}</p>
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
