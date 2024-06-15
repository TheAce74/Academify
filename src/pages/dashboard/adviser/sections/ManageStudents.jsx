import { useState, useEffect, useCallback } from "react";
import TextField from "../../../../components/ui/TextField";
import Table from "../../../../components/ui/Table";
import { useAdviser } from "../../../../hooks/useAdviser";

const ManageStudents = () => {
  const [search, setSearch] = useState("");
  const [allChecked, setAllChecked] = useState("part");
  const { getStudents } = useAdviser();

  const [stats, setStats] = useState([
    {
      title: "Total",
      value: 0,
    },
    {
      title: "Suspended",
      value: 0,
    },
    {
      title: "Withdrawn",
      value: 0,
    },
    {
      title: "Active",
      value: 0,
    },
  ]);

  const [data, setData] = useState([]);

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

  useEffect(() => {
    checkAll();
  }, [data, checkAll]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getStudents();
      setData(
        response.map((student) => ({
          name: `${student?.user?.firstName} ${student?.user?.lastName}`,
          regNumber: student.reg,
          status: "Active",
          gpaPrevious: 4.21,
          gpaCurrent: 4.45,
          cgpa: 4.06,
          remark: "Pass",
          checked: false,
        }))
      );
      setStats((prev) =>
        prev.map((stat) =>
          stat.title === "Total" || stat.title === "Active"
            ? { ...stat, value: response.length }
            : stat
        )
      );
    };
    fetchStudents();
  }, [getStudents]);

  return (
    <div>
      <div className="sm:flex sm:flex-wrap sm:items-center grid grid-cols-2 gap-6">
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
          className="w-full"
          end
          iconName="search"
          placeholder="Search student's name or reg no..."
        />
      </div>

      <Table
        allChecked={allChecked}
        data={data.filter(
          (datum) =>
            datum?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            datum?.regNumber.toLowerCase().includes(search?.toLowerCase())
        )}
        columns={columns}
        handleCheck={handleCheck}
        handleCheckAll={handleCheckAll}
        hidden
      />
    </div>
  );
};

export default ManageStudents;
