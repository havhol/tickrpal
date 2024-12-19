import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return <p>Hello {data.user.email}</p>;
}

// // src/app/dashboard/page.tsx
// "use client";

// import withLoading from "@/wrappers/withLoading";
// import DashboardContent from "@/components/Dashboard"; // Your dashboard content

// const Dashboard = () => {
//   console.log("dashboard");
//   const DashboardWithLoading = withLoading(DashboardContent);

//   return <DashboardWithLoading />;
// };

// export default Dashboard;
