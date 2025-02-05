"use client";
import React, { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Empty } from "@/components/ui/empty";
import { ChevronDown } from "lucide-react";


interface CandidateData {
  insights: string;
  strengths: string;
  weaknesses: string;
}

interface DataTableRankedCandidate<TData extends CandidateData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onViewProfile: (applicant: TData) => void;
  onScheduleInterview: (applicant: TData) => void;
}

export function DataTableRankedCandidate<TData extends CandidateData, TValue>({
  columns,
  data,
  onViewProfile,
  onScheduleInterview
}: DataTableRankedCandidate<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null); // Manage expanded rows

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRow((prev) => (prev === rowId ? null : rowId));
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded border mr-20 w-[950px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  {/* Main Row */}
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                        {cell.column.id === "actions" && (
                          <button
                            onClick={() => toggleRowExpansion(row.id)}
                            aria-expanded={expandedRow === row.id}
                          >
                            <ChevronDown
                              className={`transition-transform duration-200 ${
                                expandedRow === row.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* Expanded Row */}
                  {expandedRow === row.id && (
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        <div className="p-4 bg-gray-50 w-[930px]">
                          <div>
                            <strong className=" text-main-902 text-md mb-20">
                              Candidate Grading:
                            </strong>
                           
                            <div className="flex items-center gap-2 mb-10 mt-10">
                              <strong className="text-main-902 text-md">
                                Core Strengths:
                              </strong>
                              <ul className="text-gray-600 flex flex-wrap gap-3 text-sm ">
                                {row.original.strengths
                                  .split(", ")
                                  .map((strength: string, idx: number) => (
                                    <li
                                      key={idx}
                                      className="bg-[#BCF0DA] text-[#001433] px-4 py-2 rounded-full"
                                    >
                                      {strength}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <strong className="text-main-902 text-md">
                                Weaknesses:
                              </strong>

                              <ul className="text-gray-600 flex items-center flex-wrap gap-3 text-sm ">
                                {row.original.weaknesses
                                  .split(", ")
                                  .map((weakness: string, idx: number) => (
                                    <li
                                      key={idx}
                                      className="bg-[#fbd5d5] text-[#001433] px-4 py-2 rounded-full"
                                    >
                                      {weakness}
                                    </li>
                                  ))}
                              </ul>
                            </div>


                            <div className="bg-blue50 rounded-lg border-l-4 border-r-4 border-blue-400 bg-[#e5efff] p-4  mt-[2em]">
                              <strong className="text-blue-600 text-sm">Insights:</strong>
                              <p className="text-sm text-[.875em] text-main-600 font-[300] space-y-[1em] div-listed">
                                {row.original.insights}
                              </p>
                            </div> 


                            <div className="flex gap-4 justify-end mt-10 ">
                            <Button size="lg" onClick={() => onScheduleInterview(row.original)}>
                                Schedule Interview
                              </Button>
                              <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => onViewProfile(row.original)}
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Empty
                    title="No Candidates"
                    subtitle="No candidate has applied for this job."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end mr-20 space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
