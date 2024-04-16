import { Link } from "react-router-dom";

export default function Table2({ columns, data, link }) {
  const headers = columns.map((column, index) => {
    return (
      <th
        key={`headCell-${index}`}
        className={` items-center !z-0 text-left py-2 px-6 ${index === 0 ? "rounded-l" : index === columns.length ? "rounded-r" : ""}`}
      >
        <span className="flex items-center font-bold">{column.title}</span>
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
          className="transition-element hover:bg-slate-100 py-2"
        >
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row)
              : row[column.key];

            return (
              <td key={`cell-${index2}`} className="py-4 px-6">
                <span className="flex items-center font-semibold text-nowrap">
                  {value}
                </span>
              </td>
            );
          })}
          <td>
            <Link to={link} className="bg-primary-100 px-3 py-2 rounded-md">
              View
            </Link>
          </td>
        </tr>
      );
    })
  );

  return (
    <div className="overflow-x-auto text-sm font-jakarta transition-element w-full">
      <table className="table table-auto w-full px-2 text-neutral-600 ">
        <thead className="bg-[#F4F4F4]">
          <tr>
            {headers}
            <th></th>
          </tr>
        </thead>

        <tbody className="mt-5">{rows}</tbody>
      </table>
    </div>
  );
}
