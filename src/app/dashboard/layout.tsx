import Header from "@/components/Dashboard/Header";
import Panel from "@/components/Dashboard/Panel";
import Sidebar from "@/components/Dashboard/Sidebar";
import { AuthProvider } from "@/context/AuthProvider";
import { Flex } from "@radix-ui/themes";

// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Flex direction="row" height="100vh">
        <Sidebar />
        <Flex direction="column" flexGrow="100" flexShrink="1" flexBasis="0px">
          <Header />
          <Panel>{children}</Panel>
        </Flex>
      </Flex>
    </AuthProvider>
  );
}
