// src/app/dashboard/page.tsx
"use client";

import withLoading from "@/app/components/withLoading";
import DashboardContent from "@/app/components/Dashboard"; // Your dashboard content

const Dashboard = () => {
  const DashboardWithLoading = withLoading(DashboardContent);

  return <DashboardWithLoading />;
};

export default Dashboard;
