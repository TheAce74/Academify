import { useState, useEffect } from "react";
import Select2 from "../../../../components/ui/Select2";
import Button2 from "@mui/material/Button";
import Button from "../../../../components/ui/Button";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import Table2 from "../../../../components/ui/Table2";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import { useParentContext } from "../../../../context/ParentContext";
import { customAxios } from "../../../../services/axios";
import InputField from "../../../../components/ui/InputFieldTwo";
import Loader from "../../../../components/ui/Loader";
import { useAlert } from "../../../../hooks/useAlert";
import { useParent } from "../../../../hooks/useParent";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jsPDF from "jspdf";
import "jspdf-autotable";


const Result = () => {
  const { showAlert } = useAlert();
  const { parent } = useParentContext();
  const { getParentProfile } = useParent();
  const [addChild, setAddChild] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [FullScreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  

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
  

  const parentChildren = parent?.children?.length > 0 ? (parent?.children?.map((child) => (child.reg))) : []
  // console.log(parentChildren[0])

  const [reg, setReg] = useState(parentChildren[0])


  const handleSelectChange = (event) => {
    setReg(event.target.value);
    // console.log(event.target.value, reg)
    const regNumber = event.target.value
    getResults(regNumber)
  };


  const [semester, setSemester] = useState(0);
  const [semesters, setSemesters] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [tableData, setTableData] = useState([]);

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

  const getDisplayName = (value) => {
    return `${value?.semester?.session} ${value?.semester?.name} (${value?.semester?.name == "Rain" ? "2nd" : "1st"}) Semester`;
  };

  const getResults = async (regNumber) => {
    let semesters = [];
    try {
      setLoading(true)
      const { data } = await customAxios.post("/parent/getChildResult", {
        regNo: regNumber,
      });
      console.log(data);
      console.log(regNumber);
      let newResults = data?.results.map((result) => {
        return {
          ...result,
          displayName: getDisplayName(result),
        };
      });
      data?.results.map((detail) => {
        const value = semesters.find(
          (item) => item === `${getDisplayName(item)}`
        );
        if (value) {
          return;
        } else {
          semesters.push(
            `${detail?.semester?.session} ${detail?.semester?.name} (${detail?.semester?.name == "Rain" ? "2nd" : "1st"}) Semester`
          );
        }
      });
      setSemesters(semesters);
      setSemester(semesters[0]);
      setAllCourses(newResults);
      // console.log(semesters)
      // console.log(newResults)
      console.log(allCourses)
      // console.log(reg)
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
    }
    setLoading(false)
  };

  const downloadResult = () => {
    // Sample items data
    const itemsData = [...tableData];

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Set document properties
    pdf.setProperties({
      title: `${allCourses[0].name}`,
    });

    // Generate the vendor-specific content
    pdf.setFontSize(13);
    pdf.text(`${semester} Result`, 67, 11);
    pdf.setFontSize(11);
    pdf.text("Name:", 8, 34);
    pdf.setFont(undefined, "bold");
    pdf.text(
      `${allCourses[0].name}`,
      20,
      34
    );
    pdf.setFontSize(11);
    pdf.setFont(undefined, "normal");
    pdf.text("Registration Number:", 8, 42);
    pdf.setFont(undefined, "bold");
    pdf.text(
      `${allCourses[0].regno}`,
       46, 
       42);
    pdf.setFontSize(11);
    pdf.setFont(undefined, "normal");
    pdf.text("Department:", 8, 50);
    pdf.setFont(undefined, "bold");
    pdf.text("Computer Science", 31, 50);
    pdf.setFontSize(11);
    pdf.setFont(undefined, "normal");
    pdf.text("Level:", 8, 58);
    pdf.setFont(undefined, "bold");
    pdf.text("500", 19, 58);
    pdf.setFontSize(11);
    pdf.setFont(undefined, "normal");
    pdf.text("GPA:", 138, 42);
    pdf.setFont(undefined, "bold");
    pdf.text("5.0", 148, 42);
    pdf.setFontSize(11);
    pdf.setFont(undefined, "normal");
    pdf.text("CGPA:", 160, 42);
    pdf.setFont(undefined, "bold");
    pdf.text("4.2", 173, 42);

    // Generate AutoTable for item details
    const itemDetailsRows = itemsData?.map((item, index) => [
      (index + 1).toString(),
      item.courseCode.toString(),
      item.unit?.toString(),
      item.lab?.toString(),
      item.test?.toString(),
      item.exam?.toString(),
      item.grade?.toString(),
      item.remark?.toString(),
    ]);

    const itemDetailsHeaders = [
      "S.No",
      "Course Code",
      "Unit",
      "Lab",
      "Test",
      "Exam",
      "Grade",
      "Remark",
    ];
    // Define table styles
    const headerStyles = {
      fillColor: [236, 236, 236],
      textColor: [128, 128, 128],
      // fontFamily: "Newsreader",
      fontStyle: "bold",
    };

    // pdf.setFont("Newsreader");
    const itemDetailsYStart = 70;
    pdf.autoTable({
      head: [itemDetailsHeaders],
      body: itemDetailsRows,
      startY: itemDetailsYStart, // Adjust the Y position as needed
      headStyles: {
        fillColor: headerStyles.fillColor,
        textColor: headerStyles.textColor,
        fontStyle: headerStyles.fontStyle,
        fontSize: 10, // Adjust the font size as needed
        // font: "Newsreader", // Set the font family
        halign: "left",
      },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      bodyStyles: {
        fontSize: 10, // Adjust the font size for the body
        // font: "Newsreader", // Set the font family for the body
        cellPadding: { top: 3, right: 5, bottom: 2, left: 2 }, // Adjust cell padding
        textColor: [0, 0, 0], // Set text color for the body
        rowPageBreak: "avoid", // Avoid row page breaks
      },
      margin: { top: 10, left: 13 },
    });

    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.line(10, 283, 200, 283);
      pdf.setPage(i);
      // pdf.setFont("Newsreader");
      pdf.setFont(undefined, "normal");
      pdf.setFontSize(9);
      pdf.text(
        "Course Adviser Remarks:",
        8,
        pdf.internal.pageSize.getHeight() - 5
      );
      pdf.setFont(undefined, "bold");
      pdf.text(
        "Stellar semester - keep up the fantastic work",
        45,
        pdf.internal.pageSize.getHeight() - 5
      );
      pdf.text(
        `Page ${i} of ${totalPages}`,
        185,
        pdf.internal.pageSize.getHeight() - 5
      );
    }

    // Save the PDF
    // pdf.save(
    //   `${student?.student?.user?.firstName} ${student?.student?.user?.lastName}_${semester}`
    // );

    // pdf open in a new tab
    const pdfDataUri = pdf.output("datauristring");
    const newTab = window.open();
    newTab?.document.write(
      `<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`
    );
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
    getResults(parentChildren[0]);
  }, [parentChildren[0]]);

  useEffect(() => {
    let tableData2 = [];
      allCourses.map((course) => {
        if (course?.displayName === semester) {
          tableData2.push({
            courseCode: course?.course?.code,
            courseTitle: course?.course?.name,
            unit: course?.course?.credits,
            lab: course?.lab,
            test: course?.test,
            exam: course?.exam,
            grade: course?.grade,
            remark: "Pass",
          });
        }
      });
      setTableData(tableData2);
      console.log(tableData2)
  }, [allCourses]);


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

  const uploadChild = async () => {
    console.log(regNumber);
    try {
      setLoading(true);
      const { data } = await customAxios.post("/parent/addChild", {
        regNo: regNumber,
      });
      console.log(data);
      showAlert(data?.message, {
        variant: "success",
      });
      const mainData = getParentProfile();
      setLoading(false);
      console.log(mainData);
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
      setLoading(false);
    }
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

  return parent && parent?.children?.length > 0 ? (
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
      <div className="w-max sm:mt-0 mt-4">
          <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Child</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={reg}
              label="Select Child"
              onChange={handleSelectChange}
            >
              {parent?.children.map((child)=>(
                <MenuItem value={child.reg}>{child.user.firstName + ' ' + child.user.lastName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        </div>
        <div>
          <Button2 variant="text" sx={{ color: "#808080" }}>
            <ChatOutlinedIcon />
            <span className="ml-2">View Comments</span>
          </Button2>
        </div>
        <div className="w-max sm:mt-0 mt-4">
          <Select2
            value={semester}
            setValue={(e) => setSemester(e)}
            placeholder="Select Semester"
            options={semesters}
          />
        </div>
        
      </div>

      {loading ? (
        <div className="mt-5">
          <Table2 data='loading' columns={columns} border />
        </div>
      ):(
        <div className="mt-5">
          <Table2 data={tableData} columns={columns} border />
        </div>
      )}

      <div className="flex flex-col justify-center items-end w-full my-5">
        <div className="flex items-center mb-4">
          <h2 className="mr-12">
            <span className="font-semibold">GPA:</span> 4.12
          </h2>
          <h2>
            <span className="font-semibold">CGPA:</span> 4.24
          </h2>
        </div>

        <Button
          onClick={downloadResult}
          className="flex justify-evenly items-center px-1.5 text-sm gap-1"
        >
          <p className="ps-1">
            <FileDownloadOutlinedIcon />
          </p>
          <p className="pe-1.5">Download result</p>
        </Button>
      </div>
    </div>
  ) : (
    <div>
      {addChild ? (
        <div>
          <p>Add a child</p>
          <div className="pb-5 w-1/3 my-5">
            <label
              htmlFor="number"
              className="block mb-3 text-sm text-neutral-400"
            >
              Child{`'`}s reg no.
            </label>
            <InputField
              value={regNumber}
              setValue={setRegNumber}
              id="regNumber"
              placeholder="2019223334343"
              type="number"
            ></InputField>
            <Button
              disabled={!regNumber}
              onClick={uploadChild}
              className="flex mt-5 justify-center items-center px-1.5 text-sm gap-1"
            >
              {loading ? <Loader /> : <p className="pe-1.5">Add Child</p>}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[60vh] justify-center items-center">
          <p className="my-4">You do not have any children</p>
          <Button
            onClick={() => setAddChild(true)}
            className="flex justify-center items-center px-1.5 text-sm gap-1"
          >
            <p className="ps-1">
              <AddIcon />
            </p>
            <p className="pe-1.5">Add Child</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Result;
