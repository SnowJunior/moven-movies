"use client";
import TopNavbar from "@/components/shared/TopNavbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const query = new QueryClient();
  return (
    <div className="flex flex-col">
      <QueryClientProvider client={query}>
        <TopNavbar />
        {children}
      </QueryClientProvider>
    </div>
  );
};

export default DashboardLayout;
