import { useCallback, useEffect, useState } from "react";
import Select from "../../../../components/ui/Select";
import Button from "../../../../components/ui/Button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Table2 from "../../../../components/ui/Table2";
import { eachYearOfInterval } from "date-fns";
import { combineYears } from "../../../../utils/functions";
import { useAdviser } from "../../../../hooks/useAdviser";
import { useAdviserContext } from "../../../../context/AdviserContext";
import Loader from "../../../../components/ui/Loader";

const Semester = () => {
  const years = eachYearOfInterval({
    start: new Date(2019, 1, 6),
    end: new Date(),
  }).map((year) => year.getFullYear());
  const [academicYears] = useState(
    combineYears(years.concat(years[years.length - 1] + 1))
  );
  const [semesters] = useState(["Harmattan", "Rain"]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(0);
  const [year, setYear] = useState(0);
  const [semester, setSemester] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { createSemester, getSemesters, getCourses } = useAdviser();
  const [loading, setLoading] = useState(false);
  const [fetchedSemesters, setFetchedSemesters] = useState([]);
  const { adviser } = useAdviserContext();

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

  const handleSelectCourses = async (e) => {
    setSelectedCourses((prev) => (!prev.includes(e) ? [...prev, e] : prev));
    setCourse(e);
  };

  const fetchSemesters = useCallback(async () => {
    const response = await getSemesters();
    setFetchedSemesters(response);
  }, [getSemesters]);

  const handleChangeSemester = async (e) => {
    setSemester(e);
    const response = await getCourses(adviser?.profile?.level ?? 400, e);
    setCourses(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createSemester(semester, year, selectedCourses);
    setLoading(false);
    setSemester(0);
    setYear(0);
    setCourse(0);
    setSelectedCourses([]);
    await fetchSemesters();
  };

  useEffect(() => {
    fetchSemesters();
  }, [fetchSemesters]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center lg:gap-16">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <p className="text-xl py-2 font-bold">Create Semester</p>
          <form onSubmit={handleSubmit} className="mt-5">
            <Select
              value={year}
              setValue={setYear}
              placeholder="Select academic year"
              options={academicYears}
            />
            <Select
              value={semester}
              setValue={handleChangeSemester}
              placeholder="Select semester"
              options={semesters}
            />
            <Select
              value={course}
              setValue={handleSelectCourses}
              placeholder="Select course"
              options={courses}
            />
            <div className="flex flex-wrap gap-2 text-neutral-300 pb-2">
              {selectedCourses.map((course) => (
                <span
                  key={course}
                  className="flex justify-center items-center border rounded-md py-2 px-3 gap-x-2"
                >
                  <CloseOutlinedIcon
                    className="cursor-pointer hover:text-primary-300 transition-colors"
                    onClick={() =>
                      setSelectedCourses((prev) => [
                        ...prev.slice(0, prev.indexOf(course)),
                        ...prev.slice(prev.indexOf(course) + 1),
                      ])
                    }
                  />
                  <p>{course}</p>
                </span>
              ))}
            </div>
            <Button disabled={loading} className="w-full py-3">
              {loading ? <Loader /> : "Create Semester"}
            </Button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 order-1 lg:order-2 pb-10 lg:mb-0">
          <p className="text-xl pb-2 font-bold">Semester</p>
          <p className="text-sm">
            Here you can create a new semester by providing all the necessary
            information about the semester which includes the academic year,
            session and of course select the courses associated with the
            semester.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-xl pb-2 font-bold">Previous Semesters</p>

        <div className="mt-5">
          <Table2
            data={fetchedSemesters?.map((semester) => ({
              year: semester?.session,
              semester: semester?.name,
              level: adviser?.profile?.level,
            }))}
            columns={columns}
            link="/adviser/semesters/view"
            linkState={fetchedSemesters?.map((semester) => ({
              year: semester?.session,
              semester: semester?.name,
              courses: semester?.courses,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Semester;
