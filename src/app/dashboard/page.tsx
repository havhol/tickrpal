import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Container } from "@radix-ui/themes";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <Container maxWidth="none" mx="5">
      <p>Hello {data.user.email}</p>
    </Container>
  );
}
