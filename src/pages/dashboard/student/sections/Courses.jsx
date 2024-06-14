import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table2 from "../../../../components/ui/Table2";
import Button from "../../../../components/ui/Button";
import { useStudent } from "../../../../hooks/useStudent";
// import { useStudentContext } from "../../../../context/StudentContext";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const { getStudentProfile } = useStudent();

  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      key: "year",
      title: "Year",
    },
    {
      key: "semester",
      title: "Semester",
    },
    {
      key: "level",
      title: "Level",
    },
  ];

  const goToLink = (value) => {
    navigate("/student/courses/view", { state: value });
  };

  useEffect(() => {
    const getProfile = async () => {
      const data = await getStudentProfile();
      if (data) {
        let mainData = [];
        data?.student?.sessions.map((session) => {
          if (session.harmattan.length > 0) {
            mainData.push({
              year: session?.session,
              semester: "Harmattan",
              level: session?.level,
              courses: session?.harmattan,
            });
          }
          if (session.rain.length > 0) {
            mainData.push({
              year: session?.session,
              semester: "Rain",
              level: session?.level,
              courses: session?.rain,
            });
          }
        });
        setTableData(mainData);
      }
    };
    getProfile();
  }, []);
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
        <Link to="/student/courses/register">
          <Button className="flex justify-evenly items-center px-1.5 gap-1">
            <p className="ps-1">
              <AddIcon />
            </p>
            <p className="pe-2">Register Course</p>
          </Button>
        </Link>
      </div>

      <div className="mt-10 sm:mt-14 sm:px-5">
        <p className="text-xl pb-2 font-bold">Course Registration</p>

        <div className="mt-5">
          <Table2
            data={tableData}
            columns={columns}
            goToLink={goToLink}
            link="/student/courses/view"
            border
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
