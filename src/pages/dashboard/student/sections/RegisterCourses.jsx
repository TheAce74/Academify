import { useState } from "react";
import Select from "../../../../components/ui/Select";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputFieldTwo";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { customAxios } from "../../../../services/axios";
import Loader from "../../../../components/ui/Loader";
import { useAlert } from "../../../../hooks/useAlert";

const RegisterCourses = () => {
  const { showAlert } = useAlert();
  const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(false);

  const [courses] = useState(["MTH 101", "PHY 101", "CHM 101"]);
  const [courseCodes, setSelectedCourses] = useState([]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await customAxios.post("/course/register", {
        reg,
        courseCodes,
      });
      console.log(data);
      showAlert(data.message, {
        variant: "success",
      });
      setLoading(false);
      setReg("");
      setSelectedCourses([]);
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const selectCourse = (value) => {
    console.log(value);
    let values = [...courseCodes];
    values.push(value);
    setSelectedCourses(values);
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

  return (
    <div>
      <div className="max-w-md transition-element">
        <div>
          <p className="text-xl font-bold pb-2">Course Registration</p>
          <p className="text-sm">
            Select the academic year, session and your level, then click
            register courses to proceed with this process
          </p>
        </div>

        <div className="mt-14 sm:mt-10 transition-element">
          <p className="text-xl font-bold pb-2 border-b border-neutral-200">
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
            <div className="my-4 flex items-center transition-element">
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
            <Select
              setValue={selectCourse}
              placeholder="Select course"
              options={courses}
            />
            {/* <Select
              value={level}
              setValue={(e) => setLevel(e)}
              placeholder="Select Level"
              options={levels}
            /> */}
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
