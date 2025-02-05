"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  useRejectCandidateMutation,
  useShortlistCandidateMutation,
} from "@/redux/features/job-posting/jobpostingApi";
import SubmitButton from "@/components/shared/SubmitButton";


// This type is used to define the shape of our data.
export type createColumnsProps = {
  id: string;
  email: string;
  profile_pics: string;
  firstName: string;
  lastName: string;
  applied_possition: string;
  created_at: string;
};

export const createColumns = (candidateRefetch: () => void): ColumnDef<createColumnsProps>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="rounded mr-5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="rounded mr-5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const { profile_pics, firstName, lastName } = row.original;
      return (
        <div className="flex items-center space-x-2 ">
          <Image
            src={profile_pics}
            alt={`${firstName} ${lastName}`}
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
          />
          <span>{`${firstName} ${lastName}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { email } = row.original;
      return <span className="text-sm  ml-4">{email}</span>;
    },
  },
  {
    accessorKey: "applied_position",
    header: "Applied Position",
    cell: ({ row }) => {
      const { applied_possition } = row.original;
      return <span className="text-sm">{applied_possition}</span>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const { created_at } = row.original;
      return (
        <div className="text-sm">
          {new Date(created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: function ActionCell({ row }) {
      const { id: candidateId } = row.original;
  
      const [shortlistCandidate, { isLoading: isShortlist }] =
        useShortlistCandidateMutation();
      const [rejectCandidate, { isLoading: isRejecting }] =
        useRejectCandidateMutation();
  
      const handleShortlist = async () => {
        try {
          await shortlistCandidate({
            id: candidateId,
            status: "Shortlisted",
          }).unwrap();
          candidateRefetch();
        } catch (error) {
          console.error(error);
        }
      };
  
      const handleReject = async () => {
        try {
          await rejectCandidate({ id: candidateId }).unwrap();
          candidateRefetch();
        } catch (error) {
          console.error(error);
        }
      };
  
      return (
        <div className="flex gap-4">
          <SubmitButton
            isLoading={isShortlist}
            clickFn={handleShortlist}
            className="rounded-full px-4"
            disabled={isShortlist || isRejecting}
          >
            Shortlist
          </SubmitButton>
  
          <SubmitButton
            isLoading={isRejecting}
            clickFn={handleReject}
            className="rounded-full px-4 bg-[#FBD5D5] hover:bg-[#dca3a3] text-[#9B1c1c]"
            disabled={isShortlist || isRejecting}
          >
            Reject
          </SubmitButton>
        </div>
      );
    },
  }, 
  {
    id: "actions",
    cell: ({ }) => {
   

      return (
        <EllipsisVertical className="h-4 w-4" />
      );
    },
  },
];
