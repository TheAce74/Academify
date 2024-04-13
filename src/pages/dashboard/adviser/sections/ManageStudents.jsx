import { useState, useEffect } from "react";
import TextField from "../../../../components/ui/TextField";
import Table from "../../../../components/ui/Table";
const ManageStudents = () => {
  const [search, setSearch] = useState("");
  const [allChecked, setAllChecked] = useState("part");

  const [stats] = useState([
    {
      title: "Total",
      value: 20,
    },
    {
      title: "Suspended",
      value: 20,
    },
    {
      title: "Withdrawn",
      value: 20,
    },
    {
      title: "Active",
      value: 20,
    },
  ]);

  const [data, setData] = useState([
    {
      name: "Johnson Zakariah",
      regNumber: "20191145772",
      status: "Active",
      gpaPrevious: 4.21,
      gpaCurrent: 4.45,
      cgpa: 4.06,
      remark: "Pass",
      checked: true,
    },
    {
      name: "Johnson Madison",
      regNumber: "20191325472",
      status: "Active",
      gpaPrevious: 3.17,
      gpaCurrent: 4.05,
      cgpa: 3.98,
      remark: "Pass",
      checked: true,
    },
    {
      name: "Johnson Zakariah",
      regNumber: "20191145772",
      status: "Active",
      gpaPrevious: 2.01,
      gpaCurrent: 3.45,
      cgpa: 3.06,
      remark: "Pass",
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
      key: "status",
      title: "Status",
    },
    {
      key: "gpaPrevious",
      title: "GPA (Prev)",
    },
    {
      key: "gpaCurrent",
      title: "GPA (Current)",
    },
    {
      key: "cgpa",
      title: "CGPA",
    },
    {
      key: "remark",
      title: "Remark",
    },
  ];

  const handleCheck = (value, index) => {
    let newData = [...data];
    newData[index].checked = value;
    setData(newData);
  };
  const checkAll = () => {
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
  };
  const handleCheckAll = (value) => {
    let newData = [];
    data.forEach((item) => newData.push({ ...item, checked: value }));
    setData(newData);
  };

  useEffect(() => {
    checkAll();
  }, [data]);
  return (
    <div>
      <div className="sm:flex sm:items-center grid grid-cols-2 gap-6">
        {stats.map((item, index) => (
          <div key={index} className="border-r w-max pl-3 pr-14 h-full">
            <h3 className="text-xs">{item.title} Students</h3>
            <h1 className="font-semibold text-2xl mt-2 overflow-hidden">
              {item.value}
            </h1>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center mt-20 mb-7 h-full w-full">
        <TextField
          value={search}
          setValue={(value) => setSearch(value)}
          size="small"
          className="w-[500px]"
          end
          iconName="search"
          placeholder="Search student’s name or reg no....."
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
  );
};

export default ManageStudents;
