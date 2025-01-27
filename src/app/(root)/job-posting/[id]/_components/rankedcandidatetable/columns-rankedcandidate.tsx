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
import { ChevronDown } from 'lucide-react';
import ScoreIndicator from "../ScoreIndicator";



// This type is used to define the shape of our data.
export type createColumnsRannkedCandidateProps = {
  id: string;
  date: string;
  email: string;
  profile_picture: string;
  applicantName: string;
  applied_position: string;
  insights: string;
  strengths: string;
  weaknesses: string;
  overallScore: number;
 
};

export const createColumnsRannkedCandidate = (rankedRefetch: () => void): ColumnDef<createColumnsRannkedCandidateProps>[] => [
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
    accessorKey: "applicantName",
    id: "applicantName",
    header: "Name",
    cell: ({ row }) => {
      const { profile_picture, applicantName } = row.original;
      return (
        <div className="flex items-center space-x-2 ">
          <Image
            src={profile_picture}
            alt={applicantName}
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
          />
          <span>{applicantName}</span>
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
      const { applied_position } = row.original;
      return <span className="text-sm">{applied_position}</span>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const { date } = row.original;
      return (
        <div className="text-sm">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const { overallScore } = row.original;
      return (
        <div className="text-sm">
         <ScoreIndicator score={overallScore} />
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
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
          rankedRefetch();
         
        } catch (error) {
          console.error(error);
        }
      };

      const handleReject = async () => {
        try {
          await rejectCandidate({ id: candidateId }).unwrap();
          rankedRefetch();
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <div className="flex  gap-4">
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
   
  },
];
