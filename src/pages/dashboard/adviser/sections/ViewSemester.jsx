import Table2 from "../../../../components/ui/Table2";

const ViewSemester = () =>{

    const data = [
        {
          year: "2022/2023",
          session: "Harmattan semester",
          course: "CSC 401"
        },
        {
          year: "2022/2023",
          session: "Harmattan semester",
          course: "CSC 403"
        },
        {
          year: "2022/2023",
          session: "Harmattan semester",
          course: "CIT 401"
        },
        {
          year: "2022/2023",
          session: "Harmattan semester",
          course: "CSC 409"
        },
        {
          year: "2022/2023",
          session: "Harmattan semester",
          course: "CSC 411"
        },
        {
          year: "2022/2023",
          session: "Harmattan semester",
          course: "CSC 407"
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
          key: "course",
          title: "Course",
        }
      ];

    return <div>
        <div className="max-w-sm">
            <p className="text-xl py-2 font-bold">2022/2023 Rain Semester</p>
            <p className="text-sm">Below are the results fo the semester mentioned above. To view the result for each course, please click on the course.</p>
        </div>

        <div className="mt-10">
            <p className="text-xl pb-2 font-bold">Results</p>

            <div className="mt-5">
                <Table2
                    data={data}
                    columns={columns}
                    />
            </div>
        </div>
    </div>;
};

export default ViewSemester;