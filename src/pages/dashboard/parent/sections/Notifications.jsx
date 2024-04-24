import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Notifications = () => {
  const [allNotis] = useState([
    {
      mainTitle: "New",
      content: [
        {
          title: "Francisca Nwokoma",
          subTitle: "Course adviser replied your comment on CSC 411 result",
          topTime: "11:01am",
          bottomTime: "19 minutes ago",
        },
        {
          title: "Francisca Nwokoma",
          subTitle: "Course adviser replied your comment on CSC 411 result",
          topTime: "11:01am",
          bottomTime: "19 minutes ago",
        },
      ],
    },
    {
      mainTitle: "Last 7 days",
      content: [
        {
          title: "Course registration",
          subTitle: "You registered 9 courses for the 2022/2023 rain semester",
          topTime: "08:11am",
          bottomTime: "1 day ago. Wednesday, 24 March  2023",
        },
        {
          title: "Course registration",
          subTitle: "You registered 9 courses for the 2022/2023 rain semester",
          topTime: "08:11am",
          bottomTime: "1 day ago. Wednesday, 24 March  2023",
        },
      ],
    },
    {
      mainTitle: "Earlier",
      content: [
        {
          title: "Course registration",
          subTitle: "You registered 9 courses for the 2022/2023 rain semester",
          topTime: "08:11am",
          bottomTime: "1 day ago. Wednesday, 24 March  2023",
        },
        {
          title: "Course registration",
          subTitle: "You registered 9 courses for the 2022/2023 rain semester",
          topTime: "08:11am",
          bottomTime: "1 day ago. Wednesday, 24 March  2023",
        },
      ],
    },
  ]);
  const NotificationBox = ({ item }) => {
    return (
      <div className="rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center border border-neutral-200 ">
        <div>
          <h1 className="font-semibold text-sm sm:text-base leading-[2rem] sm:leading-[1.7rem]">
            {item.title} - {item.subTitle}{" "}
            <span className="font-normal text-xs ml-1">{item.topTime}</span>
          </h1>
          <h3 className="mt-2 text-sm">{item.bottomTime}</h3>
        </div>
        <IconButton>
          <MoreHorizIcon fontSize="large" />
        </IconButton>
      </div>
    );
  };
  return (
    <div>
      {allNotis.map((item, index) => (
        <div key={index}>
          <h1 className="font-semibold mb-3 sm:text-base text-sm">
            {item.mainTitle}
          </h1>
          <div>
            {item.content.map((item, index) => {
              return <NotificationBox key={index} item={item} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
