import { useState } from "react";
import Select from "../../../../components/ui/Select";
import Button from "../../../../components/ui/Button";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Table2 from "../../../../components/ui/Table2";

const Semester = () => {

  const [courses] = useState(["CSC403", "CSC401", "CSC407", "CSC411"]);
  const [course, setCourse] = useState(0);

  const data = [
    {
      year: "2022/2023",
      session: "Harmattan semester",
      level: "400"
    },
    {
      year: "2022/2023",
      session: "Rain semester",
      level: "400"
    },
    {
      year: "2021/2022",
      session: "Harmattan semester",
      level: "400"
    },
    {
      year: "2021/2022",
      session: "Rain semester",
      level: "400"
    },
    {
      year: "2020/2021",
      session: "Harmattan semester",
      level: "400"
    },
    {
      year: "2020/2021",
      session: "Rain semester",
      level: "400"
    }
  ];

  const columns = [
    {
      key: "year",
      title: "Year",
    },
    {
      key: "session",
      title: "Session",
    },
    {
      key: "level",
      title: "Level",
    }
  ];



  return <div>
    <div className="flex flex-col lg:flex-row justify-center lg:gap-16 px-5">
      <div className="w-full lg:w-1/2 order-2 lg:order-1">
        <p className="text-xl border-b border-neutral-200 py-2 font-bold">Create Semester</p>
        <form action="" className="mt-5">
          <Select
                value={course}
                setValue={(e) => setCourse(e)}
                placeholder="Select Course"
                options={courses}
              />
          <Select
                value={course}
                setValue={(e) => setCourse(e)}
                placeholder="Select Course"
                options={courses}
              />
          <Select
                value={course}
                setValue={(e) => setCourse(e)}
                placeholder="Select Course"
                options={courses}
              />
          <div className="flex gap-x-2 text-neutral-300 pb-6">
            <span className="flex justify-center items-center border rounded-md py-2 px-3 gap-x-2">
              <CloseOutlinedIcon/>
              <p>CSC 401</p>
            </span>
            <span className="flex justify-center items-center border rounded-md py-2 px-3 gap-x-2">
              <CloseOutlinedIcon/>
              <p>CSC 403</p>
            </span>
          </div>
          <Button className="w-full">Create Semester</Button>
        </form>
      </div>

      <div className="w-full lg:w-1/2 order-1 lg:order-2 pb-10 lg:mb-0">
        <p className="text-xl pb-2 font-bold">Semester</p>
        <p className="leading-none text-xs">Here you can create a new semester by providing all the necessary information about the semester which includes the academic year, session and oof course select the courses associated with the semester,.</p>
      </div>
    </div>

    <div className="mt-10">
      <p className="text-xl pb-2 font-bold">Previous Semesters</p>

      <div className="mt-5">
        <Table2
            data={data}
            columns={columns}
            />
      </div>
    </div>
  </div>;
};

export default Semester;
