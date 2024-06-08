import { useState } from "react";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import * as XLSX from "xlsx";
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
        console.log(json);
        setJsonData(json);
        console.log(JSON.stringify(json, null));
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
