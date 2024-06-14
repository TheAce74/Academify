import { useLocation } from "react-router-dom";
import Table2 from "../../../../components/ui/Table2";

const ViewSemester = () => {
  const { state } = useLocation();

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
      key: "course",
      title: "Course",
    },
  ];

  return (
    <div>
      <div className="max-w-sm">
        <p className="text-xl py-2 font-bold">
          {state.year} {state.semester} Semester
        </p>
        <p className="text-sm">
          Below are the results fo the semester mentioned above. To view the
          result for each course, please click on the course.
        </p>
      </div>

      <div className="mt-10">
        <p className="text-xl pb-2 font-bold">Courses</p>

        <div className="mt-5">
          <Table2
            data={state.courses.map((course) => ({
              year: state?.year,
              semester: state?.semester,
              course: course?.code,
            }))}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewSemester;
