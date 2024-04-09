import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [activeUser] = useState("student");
  const [showMenu, setShowMenu] = useState(false);

  const [adviserLinks] = useState([
    {
      name: "Dashboard",
      path: "/adviser/dashboard",
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
      path: "/adviser/manage-students",
    },
    {
      name: "Profile",
      path: "/adviser/profile",
    },
  ]);
  const [studentLinks] = useState([
    {
      name: "Dashboard",
      path: "/student/dashboard",
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
      path: "/student/notification",
    },
  ]);
  const [parentLinks] = useState([
    {
      name: "Dashboard",
      path: "/parent/dashboard",
    },
    {
      name: "Results",
      path: "/parent/results",
    },
    {
      name: "Profile",
      path: "/parent/profile",
    },
    {
      name: "Notification",
      path: "/parent/notification",
    },
  ]);

  return (
    <div className="relative w-full h-full ">
      <div className="absolute top-5 right-5 hidden md:block z-[-1]">
        <IconButton onClick={() => setShowMenu(!showMenu)}>
          {!showMenu ? <MenuIcon /> : <CloseIcon />}
        </IconButton>
      </div>
      <div
        className={`fixed top-0 bg-white transition-element left-0 overflow-y-auto translate-x-0 w-[300px] h-full border border-r flex flex-col pt-14 md:translate-x-[-300px] ${showMenu ? "md:translate-x-0 shadow-xl" : "md:translate-x-[-300px]"}`}
      >
        {/* Course Adviser */}
        {activeUser === "adviser" && (
          <div>
            {adviserLinks.map((link, index) => {
              return (
                <div
                  onClick={() => setActive(link.name)}
                  key={index}
                  className={`transition-element pl-7 py-3 mb-4 cursor-pointer ${active === link.name ? "bg-primary-300 text-white border-l-4 border-primary-400" : "hover:bg-[#ECECEC]"}`}
                >
                  <p className="">{link.name}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Student */}
        {activeUser === "student" && (
          <div>
            {studentLinks.map((link, index) => {
              return (
                <div
                  onClick={() => setActive(link.name)}
                  key={index}
                  className={`transition-element pl-7 py-3 mb-4 cursor-pointer ${active === link.name ? "bg-primary-300 text-white border-l-4 border-primary-400" : "hover:bg-[#ECECEC]"}`}
                >
                  <p className="">{link.name}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Parent */}
        {activeUser === "parent" && (
          <div>
            {parentLinks.map((link, index) => {
              return (
                <div
                  onClick={() => setActive(link.name)}
                  key={index}
                  className={`transition-element pl-7 py-3 mb-4 cursor-pointer ${active === link.name ? "bg-primary-300 text-white border-l-4 border-primary-400" : "hover:bg-[#ECECEC]"}`}
                >
                  <p className="">{link.name}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
