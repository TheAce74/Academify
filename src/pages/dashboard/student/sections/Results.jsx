import { useState, useEffect } from "react";
import Select from "../../../../components/ui/Select";
import Button2 from "@mui/material/Button";
import Button from "../../../../components/ui/Button";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import Table2 from "../../../../components/ui/Table2";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Dialog from "@mui/material/Dialog";
import { customAxios } from "../../../../services/axios";
import { useAlert } from "../../../../hooks/useAlert";
import { useStudentContext } from "../../../../context/StudentContext";

const Results = () => {
  const { student } = useStudentContext();
  const { showAlert } = useAlert();
  const [dialog, setDialog] = useState(false);
  const [FullScreen, setFullscreen] = useState(false);
  const [stats] = useState([
    {
      title: "Current GPA",
      value: "4.31",
    },
    {
      title: "Last semester GPA",
      value: "3.91",
    },
    {
      title: "CGPA",
      value: "4.23",
    },
    {
      title: "% difference from last result",
      value: "-21%",
    },
    {
      title: "Number of A",
      value: "5",
    },
    {
      title: "Number of F",
      value: "2",
    },
  ]);
  const [semester, setSemester] = useState(0);
  const [semesters] = useState([
    "2022/2023 Harmattan (1st) Semester",
    "2022/2023 Rain (2nd) Semester",
  ]);

  const [data] = useState([
    {
      courseCode: "CSC401",
      courseTitle: "Survey of Computer programming",
      unit: 3,
      lab: 20,
      test: 20,
      exam: 100,
      grade: "A",
      remark: "Pass",
      render: <div>test</div>,
    },
    {
      courseCode: "CSC401",
      courseTitle: "Survey of Computer programming",
      unit: 3,
      lab: 20,
      test: 20,
      exam: 100,
      grade: "A",
      remark: "Pass",
    },
    {
      courseCode: "CSC401",
      courseTitle: "Survey of Computer programming",
      unit: 3,
      lab: 20,
      test: 20,
      exam: 100,
      grade: "A",
      remark: "Pass",
    },
    {
      courseCode: "CSC401",
      courseTitle: "Survey of Computer programming",
      unit: 3,
      lab: 20,
      test: 20,
      exam: 100,
      grade: "A",
      remark: "Pass",
    },
  ]);

  const [columns] = useState([
    {
      key: "courseCode",
      title: "Course Code",
    },
    {
      key: "courseTitle",
      title: "Course Title",
    },
    {
      key: "unit",
      title: "Unit",
    },
    {
      key: "lab",
      title: "Lab",
    },
    {
      key: "test",
      title: "Test",
    },
    {
      key: "exam",
      title: "Exam",
    },
    {
      key: "grade",
      title: "Grade",
    },
    {
      key: "remark",
      title: "Remark",
    },
    {
      key: "action",
      render: () => (
        <div>
          <IconButton onClick={() => setDialog(true)}>
            <ChatOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ]);

  const getResults = async () => {
    try {
      const data = await customAxios.get(
        `/student/result/${student?.student?.user?._id}`
      );
      console.log(data);
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
    }
  };

  const [messageContent] = useState([
    {
      name: "John Joe",
      time: "11:11am",
      message: "Thank you very much for the car",
    },
    {
      name: "Jennifer Okeke",
      time: "11:11am",
      message:
        "Hello ma, I have an issue with my CSC 411 result. I did the practical, took the test and even sat for the exam but as the result came out I found out I had a missing test and practical score and my exam score was nothing to write home about. Please ma I would appreciate if you can look into this. Thank you!",
    },
  ]);

  useEffect(() => {
    getResults();
    console.log(student.student?.user?._id);
  }, []);

  const DialogContent = () => {
    return (
      <div className="relative p-5 overflow-y-auto">
        <div className="absolute top-2 right-2">
          <IconButton onClick={() => setDialog(false)}>
            <HighlightOffOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
        <p className="bg-slate-300 rounded-xl sm:w-2/3 w-3/4 mx-auto text-center p-4 text-xs text-neutral-500 mt-[2rem]">
          All messages can only be seen and replied to by the course adviser.
        </p>

        {messageContent.map((message, i) => (
          <div
            key={i}
            className="border border-neutral-700 shadow-sm rounded-xl px-4 pt-2 pb-7 my-5 relative"
          >
            <h3 className="text-sm">
              <span className="font-bold">{message?.name} </span>
              {message?.time}
            </h3>
            <h3 className="my-2">{message?.message}</h3>
            <div className="absolute bottom-0 right-0">
              <Button2 variant="text" sx={{ color: "#808080" }}>
                <UndoOutlinedIcon fontSize="small" />
                <span className="ml-2 text-sm">Reply</span>
              </Button2>
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    let ResponsiveModal = () => {
      if (window.innerWidth < 539) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    };
    ResponsiveModal();
    window.addEventListener("resize", ResponsiveModal);
  }, []);

  return (
    <div>
      <div className="block sm:hidden">
        <Dialog open={dialog} fullScreen={FullScreen}>
          <DialogContent />
        </Dialog>
      </div>
      <div className="grid grid-cols-2 xl:gap-0 gap-3 xl:grid-cols-6 border p-5 border-neutral-200 rounded-xl">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`${i === stats.length - 1 ? "" : "xl:border-r-2 xl:border-b-0 xl:pb-0 pb-4 border-r-0 border-b-2 border-neutral-200"} ${i === stats.length - 2 ? "border-b-0" : ""} pl-4`}
          >
            <h3 className="text-xs">{stat.title}</h3>
            <h1 className="font-semibold md:text-2xl text-lg mt-2 overflow-hidden">
              {stat.value}
            </h1>
          </div>
        ))}
      </div>

      <div className="flex sm:flex-row flex-col justify-between sm:items-center my-4">
        <div>
          <Button2 variant="text" sx={{ color: "#808080" }}>
            <ChatOutlinedIcon />
            <span className="ml-2">View Comments</span>
          </Button2>
        </div>
        <div className="w-max sm:mt-0 mt-4">
          <Select
            value={semester}
            setValue={(e) => setSemester(e)}
            placeholder="Select Semester"
            options={semesters}
          />
        </div>
      </div>

      <div className="mt-5">
        <Table2 data={data} columns={columns} border />
      </div>

      <div className="flex flex-col justify-center items-end w-full my-5">
        <div className="flex items-center mb-4">
          <h2 className="mr-12">
            <span className="font-semibold">GPA:</span> 4.12
          </h2>
          <h2>
            <span className="font-semibold">CGPA:</span> 4.24
          </h2>
        </div>

        <Button className="flex justify-evenly items-center px-1.5 text-sm gap-1">
          <p className="ps-1">
            <FileDownloadOutlinedIcon />
          </p>
          <p className="pe-1.5">Download result</p>
        </Button>
      </div>
    </div>
  );
};

export default Results;
