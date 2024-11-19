"use client";
import { RootState } from "@/redux/app/store";
import { redirect } from "next/navigation";

import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

const AdminProtected = ({ children }: ProtectedProps) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo ? children : redirect("/sign-in");
};

export default AdminProtected;
