// src/components/DashboardContent.tsx
"use client";

import { User } from "@supabase/supabase-js";

type DashboardProps = {
  user: User;
};

const DashboardContent = ({ user }: DashboardProps) => {
  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <p>This is your secure dashboard.</p>
    </div>
  );
};

export default DashboardContent;
