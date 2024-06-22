import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../../../../components/ui/Select";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputFieldTwo";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { customAxios } from "../../../../services/axios";
import Loader from "../../../../components/ui/Loader";
import { useAlert } from "../../../../hooks/useAlert";

const RegisterCourses = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState(["CSC 201", "CHM 201", "ENG 203"]);
  const [courseCodes, setSelectedCourses] = useState([]);
  const [level, setLevel] = useState(0);
  const [session, setSession] = useState(0);
  const [allSessions] = useState([
    "2021/2022",
    "2022/2023",
    "2023/2024",
    "2024/2025",
    "2025/2026",
  ]);
  const [semester, setSemester] = useState("HARMATTAN");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await customAxios.post("/course/register", {
        reg,
        level,
        session,
        semester: semester.toLowerCase(),
        courseCodes,
      });
      console.log(data);
      showAlert(data.message, {
        variant: "success",
      });
      setLoading(false);
      setReg("");
      setSelectedCourses([]);
      navigate("/student/courses");
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const getCourses = async () => {
    try {
      const { data } = await customAxios.get(
        `/courses/${level}/${semester.toLowerCase()}`
      );
      console.log(data?.courses);
      let mainData = data?.courses.map((course) => {
        return `${course?.code}`;
        // return `${course?.code} (${course.credits} units)`;
      });
      setCourses(mainData);
    } catch (e) {
      console.error(e);
    }
  };

  const selectCourse = (value) => {
    console.log(value);
    let values = [...courseCodes];
    const mainCourse = values.find((course) => value === course);
    if (mainCourse) {
      return;
    } else {
      values.push(value);
      setSelectedCourses(values);
    }
    console.log(mainCourse);
  };

  const deleteCourse = (index) => {
    let values = [...courseCodes];
    if (index === 0) {
      values.shift();
    } else {
      values.splice(index, index);
    }
    setSelectedCourses(values);
    console.log(values);
  };

  useEffect(() => {
    if (level && semester) {
      getCourses();
    }
    setSelectedCourses([]);
  }, [level, semester]);

  return (
    <div>
      <div className="max-w-lg transition-element">
        <div>
          <p className="text-xl font-bold pb-2">Course Registration</p>
          <p className="text-sm">
            Select the academic year, session and your level, then click
            register courses to proceed with this process
          </p>
        </div>

        <div className="mt-14 sm:mt-10 transition-element">
          <p className="text-xl font-bold pb-2">
            Register Courses
          </p>
          <form onSubmit={handleSubmit} className="mt-2">
            {/* <Select
              value={academicYear}
              setValue={(e) => setAcademicYear(e)}
              placeholder="Select Academic Year"
              options={academicYears}
            /> */}
            <InputField
              value={reg}
              setValue={(value) => setReg(value)}
              id="regNumber"
              placeholder="Reg Number..."
            ></InputField>

            <p className="mb-2 mt-4 text-sm opacity-60">Choose Level</p>
            <Select
              value={level}
              setValue={setLevel}
              placeholder="Select level"
              options={["100", "200", "300", "400", "500"]}
            />
            <p className="mb-2 mt-3 text-sm opacity-60">Choose Session</p>
            <Select
              value={session}
              setValue={setSession}
              placeholder="Select session"
              options={allSessions}
            />
            <p className="mb-2 mt-3 text-sm opacity-60">Choose Semester</p>
            <Select
              value={semester}
              setValue={setSemester}
              placeholder="Select semester"
              options={["HARMATTAN", "RAIN"]}
            />

            <p className="mb-2 text-sm opacity-60">Courses</p>

            <Select
              disabled={!level || !semester}
              setValue={selectCourse}
              placeholder="Select course"
              options={courses}
            />
            {!level && (
              <p className="mb-2 text-xs text-red-300 italic">Select level</p>
            )}

            <div className="my-4 grid md:grid-cols-4 grid-cols-3 gap-1.5 transition-element">
              {courseCodes.map((course, i) => (
                <div
                  key={i}
                  className="flex items-center border rounded-lg text-xs px-2 mr-1"
                >
                  <p className=" mr-2">{course}</p>
                  <IconButton size="small" onClick={() => deleteCourse(i)}>
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </div>
              ))}
            </div>

            <Button className="w-full mt-4">
              {loading ? <Loader /> : "Register Courses"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCourses;
