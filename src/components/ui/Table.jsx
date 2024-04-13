import Checkbox from "@mui/material/Checkbox";
export default function Table({
  allChecked,
  columns,
  data,
  handleCheck,
  handleCheckAll,
}) {
  const headers = columns.map((column, index) => {
    return (
      <th
        key={`headCell-${index}`}
        className={` items-center !z-0 text-left p-2 ${index === 0 ? "rounded-l" : index === columns.length - 1 ? "rounded-r" : ""}`}
      >
        <span className="flex items-center font-bold">
          {index === 0 && (
            <Checkbox
              checked={allChecked === "all"}
              indeterminate={allChecked === "part"}
              size="small"
              onChange={(e) => handleCheckAll(e.target.checked)}
              sx={{ color: "#808080" }}
            />
          )}
          {column.title}
        </span>
      </th>
    );
  });

  const rows = !data?.length ? (
    <tr>
      <td colSpan={columns.length} className="text-center">
        No data
      </td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr
          key={`row-${index}`}
          className="transition-element hover:bg-slate-100"
        >
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row)
              : row[column.key];

            return (
              <td key={`cell-${index2}`} className="p-2">
                <span className="flex items-center font-semibold">
                  {index2 === 0 && (
                    <Checkbox
                      checked={row.checked}
                      size="small"
                      onChange={(e) => handleCheck(e.target.checked, index)}
                    />
                  )}
                  {value}
                </span>
              </td>
            );
          })}
        </tr>
      );
    })
  );

  return (
    <div className="overflow-x-auto text-sm font-jakarta transition-element">
      <table className="table table-auto w-full">
        <thead className="bg-[#F4F4F4] text-neutral-600">
          <tr>{headers}</tr>
        </thead>

        <tbody className="mt-5">{rows}</tbody>
      </table>
    </div>
  );
}
