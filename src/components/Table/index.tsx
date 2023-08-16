import { Job, Company } from "@prisma/client";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useReducer, useState } from "react";
import JobCard from "../ListJobComponents/JobCard";
export type IJob = { company: Company } & Job;
const Table = ({
  jobs,
  count,
  setCurrentPage,
}: {
  jobs: IJob[];
  count: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  const columnHelper = createColumnHelper<IJob>();
  const columns = [
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
    }),
  ];
  const rerender = useReducer(() => ({}), {})[1];
  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="flex flex-col gap-5 w-full table">
      <tbody className=" ">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="">
            {row.getAllCells().map((cell) => (
              <td key={cell.id}>
                <JobCard {...cell.row.original} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot className="flex justify-end p-5 w-full">
        <tr>
          <td>
            <div className="">
              <div className="join">
                {Array.from(Array(Math.ceil(count / 3)).keys()).map((index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className="join-item btn"
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
