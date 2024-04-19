import Table2 from "../../../../components/ui/Table2";
import Button from "../../../../components/ui/Button";
import Checkbox from "@mui/material/Checkbox";

import { Link } from "react-router-dom";

const ViewCourses = () => {
  const data = [
    {
      course: "CSC401",
      title: "Survey of  Computer programming",
      unit: 3,
      courseType: "compulsory",
      register: true,
    },
    {
      course: "CSC401",
      title: "Survey of  Computer programming",
      unit: 3,
      courseType: "compulsory",
      register: true,
    },
    {
      course: "CSC401",
      title: "Survey of  Computer programming",
      unit: 3,
      courseType: "compulsory",
      register: true,
    },
    {
      course: "CSC401",
      title: "Survey of  Computer programming",
      unit: 3,
      courseType: "compulsory",
      register: true,
    },
    {
      course: "CSC401",
      title: "Survey of  Computer programming",
      unit: 3,
      courseType: "compulsory",
      register: true,
    },
  ];

  const columns = [
    {
      key: "register",
      title: "Register",
      render: () => (
        <div>
          <Checkbox size="small" />
        </div>
      ),
    },
    {
      key: "course",
      title: "Course",
    },
    {
      key: "title",
      title: "Title",
    },
    {
      key: "unit",
      title: "Unit",
    },
    {
      key: "courseType",
      title: "Course Type",
    },
  ];
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-y-5 sm:px-5 py-2">
        <div className="max-w-sm">
          <p className="font-bold text-xl pb-2">Course Registration</p>
          <p className="text-sm">
            On this page, you will be able to register you courses as well as
            see the previous courses you have registered. To register courses
            for a new semester, click the register course button
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mt-14 sm:px-5">
        <p className="text-xl pb-2 font-bold">Course Registration</p>

        <div className="mt-5">
          <Table2 data={data} columns={columns} border />
        </div>
      </div>
      <div className="flex justify-end mt-6 xl:pr-5 pr-0">
        <Link>
          <Button className="flex justify-evenly items-center px-1.5 gap-1">
            Register Courses
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ViewCourses;
