import { User } from "@supabase/supabase-js";

interface DashboardProps {
  user: User;
}

const DashboardContent = ({ user }: DashboardProps) => {
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      {/* Add other dashboard content */}
    </div>
  );
};

export default DashboardContent;
