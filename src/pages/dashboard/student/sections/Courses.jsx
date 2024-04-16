import Table2 from "../../../../components/ui/Table2";
import Button from "../../../../components/ui/Button";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const Courses = () => {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = "/student/courses/register"; 
    navigate(path);
  }

  const data = [
    {
      year: "2022/2023",
      session: "Harmattan semester",
      level: "400",
    },
    {
      year: "2022/2023",
      session: "Rain semester",
      level: "400",
    },
    {
      year: "2021/2022",
      session: "Harmattan semester",
      level: "400",
    },
    {
      year: "2021/2022",
      session: "Rain semester",
      level: "400",
    },
    {
      year: "2020/2021",
      session: "Harmattan semester",
      level: "400",
    },
    {
      year: "2020/2021",
      session: "Rain semester",
      level: "400",
    },
  ];

  const columns = [
    {
      key: "year",
      title: "Year",
    },
    {
      key: "session",
      title: "Session",
    },
    {
      key: "level",
      title: "Level",
    },
  ];


  return <div>
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-y-5 sm:px-5 py-2">
      <div className="max-w-sm">
        <p className="font-bold text-xl pb-2">Course Registration</p>
        <p className="text-xs">On this page, you will be able to register you courses as well as see the previous courses you have registered. To register courses for a new semester, click the register course button</p>
      </div>
      <div>
        <Button className="flex justify-evenly items-center px-1.5 gap-1">
          <p className="ps-1"><AddIcon/></p>
          <p className="pe-2">Register Course</p>
        </Button>
      </div>
    </div>

    <div className="mt-10 sm:mt-14 sm:px-5">
        <p className="text-xl pb-2 font-bold">Course Registration</p>

        <div className="mt-5">
          <Table2 data={data} columns={columns} />
        </div>
      </div>
  </div>;
};

export default Courses;
