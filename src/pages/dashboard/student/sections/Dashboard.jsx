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
    <div>
      <div className="flex flex-col sm:flex-row justify-center gap-10 xl:px-20 px-10">
        <Link
          to="/student/results"
          className="border-2 rounded-lg border-neutral-200 shadow-md sm:w-1/2 h-full hover:-translate-y-2 hover:shadow-lg transition"
        >
          <div className=" pb-12 pt-5 px-4 max-w-md">
            <p className="font-bold text-lg pb-1 text-neutral-600">
              Check Results
            </p>
            <p className="text-sm text-neutral-500">
              View results that has been uploaded by the course adviser
            </p>
          </div>
        </Link>
        <Link
          to="/student/courses"
          className="border-2 rounded-lg border-neutral-200 shadow-md sm:w-1/2 h-full hover:-translate-y-2 hover:shadow-lg transition"
        >
          <div className=" pb-12 pt-5 px-4 max-w-md">
            <p className="font-bold text-lg pb-1 text-neutral-600">
              Course Registration
            </p>
            <p className="text-sm text-neutral-500">
              Register courses for new semesters
            </p>
          </div>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-10 xl:px-20 px-10 mt-10">
        <div className="flex flex-col gap-10 max-w-md sm:w-1/2">
          <div className="border-2 rounded-lg border-neutral-200  pb-12 max-w-md">
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
        <div className="border-2 rounded-lg border-neutral-200 max-w-md sm:w-1/2 max-h-fit">
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
