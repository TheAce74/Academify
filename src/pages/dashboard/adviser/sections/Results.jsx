import { useState, useEffect, useCallback, useRef } from "react";
import HistoryIcon from "@mui/icons-material/History";
import Select from "../../../../components/ui/Select";
import DocumentUpload from "../../../../components/ui/DocumentUpload";
import Button from "../../../../components/ui/Button";
import TextField from "../../../../components/ui/TextField";
import Table from "../../../../components/ui/Table";
import Loader from "../../../../components/ui/Loader";
import { customAxios } from "../../../../services/axios";
import { useAlert } from "../../../../hooks/useAlert";
import { eachYearOfInterval } from "date-fns";
import {
  combineYears,
  countStudents,
  getGrades,
} from "../../../../utils/functions";
import { useAdviser } from "../../../../hooks/useAdviser";
import Table2 from "../../../../components/ui/Table2";

const Results = () => {
  const { showAlert } = useAlert();

  // Dropdown options
  const years = eachYearOfInterval({
    start: new Date(2019, 1, 6),
    end: new Date(),
  }).map((year) => year.getFullYear());
  const [academicYears] = useState(
    combineYears(years.concat(years[years.length - 1] + 1))
  );
  const [semesters] = useState(["Harmattan", "Rain"]);
  const [courses, setCourses] = useState([]);

  const [academicYear, setAcademicYear] = useState(0);
  const [semester, setSemester] = useState(0);
  const [course, setCourse] = useState(0);
  const [document, setDocument] = useState(null);
  const [resultResponse, setResultResponse] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [allChecked, setAllChecked] = useState("part");

  const [data, setData] = useState([]);

  const columns = [
    {
      key: "name",
      title: "Student Name",
    },
    {
      key: "regno",
      title: "Registration Number",
    },
    {
      key: "test",
      title: "Test",
    },
    {
      key: "lab",
      title: "Lab",
    },
    {
      key: "exam",
      title: "Exam",
    },
    {
      key: "total",
      title: "Total Score (100)",
    },
    {
      key: "grade",
      title: "Grade",
    },
  ];

  const columns2 = [
    {
      key: "year",
      title: "Year",
    },
    {
      key: "semester",
      title: "Semester",
    },
    {
      key: "courses",
      title: "Number of courses",
    },
  ];

  const columns3 = [
    {
      key: "title",
      title: "Course title",
    },
    {
      key: "code",
      title: "Course code",
    },
    {
      key: "credits",
      title: "Credits",
    },
    {
      key: "type",
      title: "Type",
    },
  ];

  const { getSemesters, getResult } = useAdviser();
  const [fetchedSemester, setFetchedSemester] = useState({});
  const [fetchedSemesters, setFetchedSemesters] = useState([]);
  const sessionRef = useRef({});

  const fetchSemesters = useCallback(
    async (semester) => {
      if (!semester) {
        const response = await getSemesters();
        setFetchedSemesters(response);
      } else {
        const response = await getSemesters(academicYear, semester);
        setFetchedSemester(response[0]);
        setCourses(response[0].courses.map((course) => course.code));
      }
    },
    [academicYear, getSemesters]
  );

  const uploadResult = async () => {
    if (!academicYear || !semester || !course) {
      showAlert("All fields are required", {
        variant: "error",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await customAxios.post("/advisors/upload-results", {
        course: fetchedSemester.courses
          .filter((item) => item.code === course)
          .map((item) => item._id)[0],
        semester: fetchedSemester._id,
        results: document,
      });
      setSemester(0);
      setCourse(0);
      setAcademicYear(0);
      setDocument(null);
      showAlert(data?.message, {
        variant: "success",
      });
      setLoading(false);
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const fetchResult = async (semester, course) => {
    showAlert("Fetching result...");
    const response = await getResult(semester, course);
    setData(response.map((datum) => ({ ...datum, checked: false })));
    showAlert("Results fetched", {
      variant: "success",
    });
  };

  const handleCheck = (value, index) => {
    let newData = [...data];
    newData[index].checked = value;
    setData(newData);
  };

  const checkAll = useCallback(() => {
    let all = [];
    data.map((item) => {
      if (item.checked === true) {
        all.push(item.checked);
      }
    });
    if (all.length > 0) {
      if (all.length === data.length) {
        setAllChecked("all");
      } else {
        setAllChecked("part");
      }
    } else {
      setAllChecked("none");
    }
  }, [data]);

  const handleCheckAll = (value) => {
    let newData = [];
    data.forEach((item) => newData.push({ ...item, checked: value }));
    setData(newData);
  };

  const handleSetFile = useCallback((file) => setDocument(file), []);

  useEffect(() => {
    checkAll();
  }, [data, checkAll]);

  useEffect(() => {
    fetchSemesters();
  }, [fetchSemesters]);

  return (
    <div>
      {resultResponse === 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-16">
          <div className="md:w-9/12 w-full lg:order-1">
            <h1 className="font-bold text-xl mb-1">Result</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Imperdiet eleifend aenean
              pellentesque nunc convallis purus. Pretium nisl rhoncus congue
              lacinia non habitant laoreet dui.
            </p>
          </div>
          <div className="lg:mt-0 mt-5">
            <h1 className="font-bold text-xl pb-2 border-b">Upload Result</h1>
            <h3
              onClick={() => setResultResponse(1)}
              className="text-right mt-3 mb-4 flex items-center justify-start lg:justify-end cursor-pointer hover:text-primary-500"
            >
              <span className="mr-3">View previously uploaded results</span>
              <HistoryIcon />
            </h3>
            <Select
              value={academicYear}
              setValue={(e) => setAcademicYear(e)}
              placeholder="Select Academic Year"
              options={academicYears}
            />
            <Select
              value={semester}
              setValue={(e) => {
                setSemester(e);
                fetchSemesters(e);
              }}
              placeholder="Select Semester"
              options={semesters}
            />
            <Select
              value={course}
              setValue={(e) => setCourse(e)}
              placeholder="Select Courses"
              options={courses}
            />

            <DocumentUpload className="mt-4 mb-6" setJsonData={handleSetFile} />
            <Button
              onClick={uploadResult}
              disabled={loading || document === null}
              className="w-full"
            >
              {loading ? <Loader /> : <p className="pe-1.5">Upload Result</p>}
            </Button>
          </div>
        </div>
      ) : resultResponse === 1 ? (
        <div>
          <button
            onClick={() => setResultResponse(0)}
            className="text-sm font-semibold text-[#1938DB] transition-colors hover:text-primary-300 focus-visible:text-primary-300 cursor-pointer"
          >
            Go back
          </button>
          <p className="text-xl pb-2 font-bold">Previous Results</p>

          <div className="mt-5">
            <Table2
              data={fetchedSemesters?.map((semester) => ({
                year: semester?.session,
                semester: semester?.name,
                courses: semester?.courses.length,
                id: semester?._id,
                courseList: semester?.courses,
              }))}
              columns={columns2}
              link="/adviser/semesters/results"
              goToLink={(semester) => {
                sessionRef.current = semester;
                setResultResponse(2);
              }}
            />
          </div>
        </div>
      ) : resultResponse === 2 ? (
        <div>
          <button
            onClick={() => setResultResponse(1)}
            className="text-sm font-semibold text-[#1938DB] transition-colors hover:text-primary-300 focus-visible:text-primary-300 cursor-pointer"
          >
            Go back
          </button>
          <p className="text-xl pb-2 font-bold">
            {sessionRef.current?.year} {sessionRef.current?.semester} Semester
            Results
          </p>

          <div className="mt-5">
            <Table2
              data={sessionRef.current?.courseList?.map((course) => ({
                title: course?.name,
                code: course?.code,
                credits: course?.credits,
                type: course?.type,
                id: course?._id,
              }))}
              columns={columns3}
              link="/adviser/results/view"
              goToLink={(course) => {
                fetchResult(sessionRef.current?.id, course?.id);
                setResultResponse(3);
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setResultResponse(2)}
            className="text-sm font-semibold text-[#1938DB] transition-colors hover:text-primary-300 focus-visible:text-primary-300 cursor-pointer"
          >
            Go back
          </button>
          <div className="grid grid-cols-2 gap-3 2xl:grid-cols-6 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="border-r w-max px-3 h-full">
                <h3 className="text-xs">
                  Number of students who got {getGrades(item)}
                </h3>
                <h1 className="font-semibold text-2xl mt-2 overflow-hidden">
                  {countStudents(data)[item]}
                </h1>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center mt-10 mb-6 h-full w-full">
            <TextField
              value={search}
              setValue={(value) => setSearch(value)}
              size="small"
              className="w-[500px]"
              end
              iconName="search"
              placeholder="Search student's name or reg no....."
            />
          </div>

          <Table
            allChecked={allChecked}
            data={data.filter(
              (datum) =>
                datum?.name?.toLowerCase().includes(search?.toLowerCase()) ||
                datum?.regno.toLowerCase().includes(search?.toLowerCase())
            )}
            columns={columns}
            handleCheck={handleCheck}
            handleCheckAll={handleCheckAll}
            hidden
          />
        </div>
      )}
    </div>
  );
};

export default Results;
