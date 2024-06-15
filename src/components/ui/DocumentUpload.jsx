import { useState } from "react";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import * as XLSX from "xlsx";
import { getGrade } from "../../utils/functions";
export default function DocumentUpload({ setJsonData, className }) {
  const [csvFile, setCsvFile] = useState(null);

  const calculateSize = (value) => {
    return (value / 1000).toFixed(2);
  };

  const handleFileSelect = (file) => {
    setCsvFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const filteredJson = json
          .filter((item) => item.REGNO)
          .map((item) => ({
            name: item.NAMES,
            regno: typeof item.REGNO === "number" ? item.REGNO : 0,
            test: typeof item.TEST === "number" ? item.TEST : 0,
            lab: typeof item.LAB === "number" ? item.LAB : 0,
            exam: typeof item.EXAM === "number" ? item.EXAM : 0,
            total:
              Number(typeof item.TEST === "number" ? item.TEST : 0) +
              Number(typeof item.LAB === "number" ? item.LAB : 0) +
              Number(typeof item.EXAM === "number" ? item.EXAM : 0),
            grade: getGrade(
              Number(typeof item.TEST === "number" ? item.TEST : 0) +
                Number(typeof item.LAB === "number" ? item.LAB : 0) +
                Number(typeof item.EXAM === "number" ? item.EXAM : 0)
            ),
          }));
        setJsonData(filteredJson);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className={`${className} transition-element text-sm `}>
      <input
        className="opacity-0 absolute w-max h-max cursor-pointer"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        id="fileSelect"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <label
        htmlFor="fileSelect"
        className="cursor-pointer bg-[#EFEFEF] rounded-md border border-neutral-500 py-3 text-center flex items-center justify-center"
      >
        {csvFile ? (
          <span>
            {csvFile?.name} - {calculateSize(csvFile?.size)}KB
          </span>
        ) : (
          <span>
            <CloudSyncOutlinedIcon sx={{ color: "#424242" }} />{" "}
            <span className="ml-3 -mt-0.5">
              Drag .xlsx document here or choose file to upload new results
            </span>
          </span>
        )}
      </label>
    </div>
  );
}
