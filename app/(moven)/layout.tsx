"use client";
import TopNavbar from "@/components/shared/TopNavbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const query = new QueryClient();
  const { data: session } = useSession();
  return (
    <div className="flex flex-col mx-auto w-full">
      <QueryClientProvider client={query}>
        <TopNavbar name={`${session?.user?.name}`} />
        {children}
      </QueryClientProvider>
    </div>
  );
};

export default DashboardLayout;
