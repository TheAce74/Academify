import { useState, useEffect } from "react";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
// import * as XLSX from "xlsx";
import { read, utils } from "xlsx";
export default function DocumentUpload({ setFile, className }) {
  const [csvFile, setCsvFile] = useState(null);

  const calculateSize = (value) => {
    return (value / 1000).toFixed(2);
  };

  const handleFileSelect = (event) => {
    const file = event.currentTarget.files[0]; // Get selected file

    setCsvFile(file);
    const reader = new FileReader();
    console.log(reader);

    reader.onload = function (event) {
      const data = new Uint8Array(event.target.result);
      console.log(data);
      const workbook = read(data, { type: "array" });
      console.log(workbook);

      // Assume the first sheet is the one you want to display
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert worksheet to JSON object
      const jsonData = utils.sheet_to_json(worksheet);

      console.log("data", jsonData[0]);

      //   // Get table header from the first row of the worksheet
      //   const headerRow = Object.keys(jsonData[0]);

      //   // Populate table header
      //   const tableHead = document.getElementById("dataTable").createTHead();
      //   const headerRowElement = tableHead.insertRow();
      //   headerRow.forEach((header) => {
      //     const th = document.createElement("th");
      //     th.textContent = header;
      //     headerRowElement.appendChild(th);
      //   });

      //   // Populate table body with data
      //   const tableBody = document.getElementById("tableBody");
      //   jsonData.forEach((rowData) => {
      //     const row = tableBody.insertRow();
      //     headerRow.forEach((header) => {
      //       const cell = row.insertCell();
      //       cell.textContent = rowData[header];
      //     });
      //   });

      //   // Add missing rows and columns
      //   const maxColumns = headerRow.length;
      //   jsonData.forEach((rowData, index) => {
      //     const row = tableBody.rows[index];
      //     if (!row) {
      //       const newRow = tableBody.insertRow();
      //       for (let i = 0; i < maxColumns; i++) {
      //         const cell = newRow.insertCell();
      //         cell.textContent = rowData[headerRow[i]] || "";
      //       }
      //     } else {
      //       for (let i = row.cells.length; i < maxColumns; i++) {
      //         const cell = row.insertCell();
      //         cell.textContent = rowData[headerRow[i]] || "";
      //       }
      //     }
      //   });
      // };

      reader.readAsArrayBuffer(file);
      console.log(reader);
      // console.log(file);
    };
  };

  const handleCsvChange = (e) => {
    if (e.currentTarget.files) setCsvFile(e.currentTarget.files[0]);
  };

  useEffect(() => {
    setFile(csvFile);
  }, [csvFile, setFile]);

  return (
    <div className={`${className} transition-element text-sm `}>
      <input
        className="opacity-0 absolute w-max h-max cursor-pointer"
        onChange={handleFileSelect}
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
