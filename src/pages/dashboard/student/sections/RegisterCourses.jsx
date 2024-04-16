import { useState } from "react";
import Select from "../../../../components/ui/Select";
import Button from "../../../../components/ui/Button";

const RegisterCourses = () => {
  const [academicYears] = useState([2019, 2020, 2021, 2022, 2023]);
  const [sessions] = useState(["HARMATTAN", "RAIN"]);
  const [levels] = useState([100, 200, 300, 400, 500]);

  const [academicYear, setAcademicYear] = useState(0);
  const [session, setSession] = useState(0);
  const [level, setLevel] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="max-w-md">
        <div>
          <p className="text-xl font-bold pb-2">Course Registration</p>
          <p className="text-sm">
            Select the academic year, session and your level, then click
            register courses to proceed with this process
          </p>
        </div>

        <div className="mt-14 sm:mt-10">
          <p className="text-xl font-bold pb-2 border-b border-neutral-200">
            Register Courses
          </p>
          <form onSubmit={handleSubmit} className="mt-2">
            <Select
              value={academicYear}
              setValue={(e) => setAcademicYear(e)}
              placeholder="Select Academic Year"
              options={academicYears}
            />
            <Select
              value={session}
              setValue={(e) => setSession(e)}
              placeholder="Select Session"
              options={sessions}
            />
            <Select
              value={level}
              setValue={(e) => setLevel(e)}
              placeholder="Select Level"
              options={levels}
            />
            <Button className="w-full">Register Course</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCourses;
