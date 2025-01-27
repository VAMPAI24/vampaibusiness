// "use client";
// import { RootState } from "@/redux/app/store";
// import { redirect } from "next/navigation";
// import { useSelector } from "react-redux";

// interface ProtectedProps {
//   children: React.ReactNode;
// }

// const AdminProtected = ({ children }: ProtectedProps) => {
//   const { userInfo } = useSelector((state: RootState) => state.auth);

//   return userInfo ? <>{children}</> : redirect("/sign-in");
// };

// export default AdminProtected;

"use client";
import { getSession } from "@/redux/app/cookies";
// import { RootState } from "@/redux/app/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

const AdminProtected = ({ children }: ProtectedProps) => {
  // const { token } = useSelector((state: RootState) => state.auth);
  const token = getSession();
  const router = useRouter();

  // Local state to manage hydration error
  const [isHydrated, setIsHydrated] = useState(false);

  // Use effect to set hydration flag after the first render
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return; // Avoid redirecting during SSR

    if (!token?.token) {
      router.push("/sign-in"); // Redirect to sign-in if no token
    }
  }, [token?.token, isHydrated, router]);

  if (!isHydrated) {
    return null; // Render nothing during SSR to avoid hydration issues
  }

  return <>{children}</>; // Render children if token exists
};

export default AdminProtected;
