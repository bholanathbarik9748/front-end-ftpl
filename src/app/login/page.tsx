import AuthGuard from "@/components/Auth/AuthGuard";
import Login from "@/page/login/Login";
import React from "react";

const page = () => {
  return (
    <AuthGuard>
      <Login />
    </AuthGuard>
  );
};

export default page;
