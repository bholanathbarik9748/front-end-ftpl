import AuthGuard from "@/components/Auth/AuthGuard";
import SignUp from "@/page/signUp/SignUp";
import React from "react";

function page() {
  return (
    <>
      <AuthGuard>
        <SignUp />
      </AuthGuard>
    </>
  );
}

export default page;
