import { useState, useEffect, useCallback } from "react";
import HistoryIcon from "@mui/icons-material/History";
import Select from "../../../../components/ui/Select";
import DocumentUpload from "../../../../components/ui/DocumentUpload";
import Button from "../../../../components/ui/Button";
import TextField from "../../../../components/ui/TextField";
import Table from "../../../../components/ui/Table";
import Loader from "../../../../components/ui/Loader";
import { customAxios } from "../../../../services/axios";
import { useAlert } from "../../../../hooks/useAlert";

const Results = () => {
  const { showAlert } = useAlert();

  // Dropdown options
  const [academicYears] = useState([2019, 2020, 2021, 2022, 2023]);
  const [semesters] = useState(["HARMATTAN", "RAIN"]);
  const [courses] = useState(["MTH501", "CSC401", "CSC407"]);

  const [academicYear, setAcademicYear] = useState(0);
  const [semester, setSemester] = useState(0);
  const [course, setCourse] = useState(0);
  const [document, setDocument] = useState(null);
  const [resultResponse, setResultResponse] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [allChecked, setAllChecked] = useState("part");

  const [data, setData] = useState([
    {
      name: "Johnson Zakariah",
      regNumber: "20191145772",
      test: 20,
      practical: 20,
      exam: 20,
      total: 20,
      grade: "A",
      checked: true,
    },
    {
      name: "Johnson Madison",
      regNumber: "20191325472",
      test: 60,
      practical: 10,
      exam: 20,
      total: 20,
      grade: "B",
      checked: true,
    },
    {
      name: "Johnson Zakariah",
      regNumber: "20191145772",
      test: 20,
      practical: 20,
      exam: 20,
      total: 20,
      grade: "A",
      checked: false,
    },
  ]);

  const columns = [
    {
      key: "name",
      title: "Student Name",
    },
    {
      key: "regNumber",
      title: "Registration Number",
    },
    {
      key: "test",
      title: "Test",
    },
    {
      key: "practical",
      title: "Practical",
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

  const uploadResult = async () => {
    try {
      setLoading(true);
      const { data } = await customAxios.post("/advisors/upload-results", {
        results: document,
      });

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

  return (
    <div>
      {!resultResponse ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          <div className="md:w-9/12 w-full">
            <h1 className="font-medium mb-1">Result</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Imperdiet eleifend aenean
              pellentesque nunc convallis purus. Pretium nisl rhoncus congue
              lacinia non habitant laoreet dui.
            </p>
          </div>
          <div className="lg:mt-0 mt-5">
            <h1 className="font-medium pb-2 border-b">Upload Result</h1>
            <h3 className="text-right mt-3 mb-4 flex items-center justify-start lg:justify-end cursor-pointer hover:text-primary-500">
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
              setValue={(e) => setSemester(e)}
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
            <Button onClick={uploadResult} className="w-full">
              {loading ? <Loader /> : <p className="pe-1.5">Upload Result</p>}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-3 2xl:grid-cols-6 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="border-r w-max px-3 h-full">
                <h3 className="text-xs">Number of students who got A</h3>
                <h1 className="font-semibold text-2xl mt-2 overflow-hidden">
                  20
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
            data={data}
            columns={columns}
            handleCheck={handleCheck}
            handleCheckAll={handleCheckAll}
          />
        </div>
      )}
    </div>
  );
};

export default Results;
