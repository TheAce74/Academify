import { useState, useEffect } from "react";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
export default function DocumentUpload({ setFile, className }) {
  const [csvFile, setCsvFile] = useState(null);

  const calculateSize = (value) => {
    return (value / 1000).toFixed(2);
  };

  const handleCsvChange = (e) => {
    if (e.currentTarget.files) setCsvFile(e.currentTarget.files[0]);
  };

  useEffect(() => {
    setFile(csvFile);
  }, [csvFile]);
  return (
    <div className={`${className} transition-element text-sm `}>
      <input
        className="opacity-0 absolute w-max h-max cursor-pointer"
        onChange={handleCsvChange}
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
