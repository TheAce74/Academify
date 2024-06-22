import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const events = [
    {
      title: "Test starts on 3rd March 2024",
    },
    {
      title:
        "Tickets for  the upcoming Tech Event - Development of AI is out !!",
    },
  ];

  const activities = [
    {
      title:
        "Francisca Nwokoma - Course adviser replied your comment on CSC 411 result",
      time: "19 minutes ago",
    },
    {
      title:
        "Francisca Nwokoma - Course adviser replied your comment on CSC 411 result",
      time: "19 minutes ago",
    },
    {
      title:
        "Francisca Nwokoma - Course adviser replied your comment on CSC 411 result",
      time: "19 minutes ago",
    },
  ];

  return (
    <div className="font-jakarta">
      <div className="flex flex-col sm:flex-row justify-center align-middle gap-10 ">
        <Link
          to="/adviser/results"
          className="border-[1px] border-neutral-200 rounded-lg shadow-[0_4px_5px_0] shadow-neutral-200/50 hover:scale-[1.05] sm:w-1/2 h-full transition"
        >
          <div className="pb-12 pt-5 px-4 max-w-md lg:max-w-full">
            <p className="font-bold text-lg pb-1 text-neutral-600">
              Upload Results
            </p>
            <p className="text-sm text-neutral-500">
              Upload student grades and view academic performances.
            </p>
          </div>
        </Link>
        <Link
          to="/adviser/semesters"
          className="border-[1px] border-neutral-200 rounded-lg shadow-[0_4px_5px_0] shadow-neutral-200/50 hover:scale-[1.05] sm:w-1/2 h-full transition"
        >
          <div className=" pb-12 pt-5 px-4 max-w-md lg:max-w-full">
            <p className="font-bold text-lg pb-1 text-neutral-600">
              Create Semester
            </p>
            <p className="text-sm text-neutral-500">
              Create new semesters and open courses for the academic session
            </p>
          </div>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-10 mt-10">
        <div className="flex flex-col gap-10 sm:w-full">
          <Link
            to="/adviser/manage"
            className="border-[1px] border-neutral-200 rounded-lg shadow-[0_4px_5px_0] shadow-neutral-200/50 hover:scale-[1.05] h-full transition"
          >
            <div className=" pb-12 pt-5 px-4 max-w-md lg:max-w-full">
              <p className="font-bold text-lg pb-1 text-neutral-600">
                View Students
              </p>
              <p className="text-sm text-neutral-500">
                Oversee student profiles and academic progress
              </p>
            </div>
          </Link>
          <div className="border-[1px] border-neutral-200 rounded-lg shadow-[0_4px_5px_0] shadow-neutral-200/50 pb-12">
            <p className="font-bold text-lg py-2 text-neutral-600 border-b-2 border-neutral-200 px-4">
              Events
            </p>
            <ul>
              {events.map((item, index) => (
                <li
                  key={index}
                  className="text-xs border-b border-neutral-200 px-4 py-2"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-[1px] sm:w-full border-neutral-200 rounded-lg shadow-[0_4px_5px_0] shadow-neutral-200/50 max-h-fit">
          <p className="font-bold text-lg py-2 text-neutral-600 border-b-2 border-neutral-200 px-4">
            Recent Activity
          </p>
          <ul>
            {activities.map((item, index) => (
              <li
                key={index}
                className="text-xs border-b border-neutral-200 px-4 py-2 flex justify-between items-center"
              >
                <span className="py-1 max-w-[80%]">
                  <p className="text-xs font-bold text-neutral-600 pb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-neutral-500">{item.time}</p>
                </span>
                <span>
                  <MoreHorizIcon />
                </span>
              </li>
            ))}
            <li className="flex justify-end items-center px-4 py-2">
              <p className="font-bold">Show all</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
