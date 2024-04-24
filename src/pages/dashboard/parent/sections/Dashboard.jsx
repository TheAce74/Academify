import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [events] = useState([
    "Test starts on 3rd March 2024",
    "Tickets for  the upcoming Tech Event - Development of AI is out !!",
  ]);

  const [activities] = useState([
    {
      title: "Francisca Nwokoma",
      subTitle: "Course adviser replied your comment on CSC 411 result",
      bottomTime: "19 minutes ago",
    },
    {
      title: "Francisca Nwokoma",
      subTitle: "Course adviser replied your comment on CSC 411 result",
      bottomTime: "19 minutes ago",
    },
    {
      title: "Francisca Nwokoma",
      subTitle: "Course adviser replied your comment on CSC 411 result",
      bottomTime: "19 minutes ago",
    },
    {
      title: "Francisca Nwokoma",
      subTitle: "Course adviser replied your comment on CSC 411 result",
      bottomTime: "19 minutes ago",
    },
  ]);
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-7">
      <div>
        <Link
          to="/parent/result"
          className="rounded-lg block px-4 py-5 border-[1.5px] border-neutral-800"
        >
          <h1 className="font-semibold text-lg mb-2">Check Results</h1>
          <p>View results that has been uploaded by the course adviser</p>
        </Link>

        {/* Events */}
        <div className="rounded-lg py-5 border-[1.5px] border-neutral-800 mt-7">
          <h1 className="font-semibold text-lg mb-2 border-b-2 pb-4 px-4">
            Events
          </h1>
          <div className="my-3">
            {events.map((item, i) => (
              <div
                key={i}
                className="py-3 px-4 border-b flex items-center text-sm"
              >
                <div className="rounded-full w-2 h-2 bg-[#131313] mr-2"></div>{" "}
                <h3 className="font-medium">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg py-5 border-[1.5px] border-neutral-800">
        <h1 className="font-semibold text-lg mb-2 border-b-2 pb-4 px-4">
          Recent Activity
        </h1>
        <div className="my-3">
          {activities.map((item, i) => (
            <div
              key={i}
              className="py-3 px-4 border-b flex justify-between items-center text-sm"
            >
              <div className="w-2/3">
                <h1 className="font-semibold leading-[2rem] sm:leading-[1.7rem]">
                  {item.title} - {item.subTitle}{" "}
                </h1>
                <h3 className="mt-2">{item.bottomTime}</h3>
              </div>
              <IconButton>
                <MoreHorizIcon fontSize="small" />
              </IconButton>
            </div>
          ))}

          <div className="flex justify-end m-4">
            <Button variant="text" sx={{ color: "#000", fontWeight: "bold" }}>
              Show all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
