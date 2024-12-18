// src/app/dashboard/page.tsx
"use client";

import withLoading from "@/wrappers/withLoading";
import DashboardContent from "@/components/Dashboard"; // Your dashboard content

const Dashboard = () => {
  const DashboardWithLoading = withLoading(DashboardContent);

  return <DashboardWithLoading />;
};

export default Dashboard;
