import CenteredContent from "@/components/Shared/CenteredContent";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CenteredContent>
      <main>{children}</main>
    </CenteredContent>
  );
}
