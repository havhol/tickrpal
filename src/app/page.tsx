import Promo from "@/components/Homepage/Promo";
import Header from "@/components/Layout/Header";
import { CustomUser, fetchUser } from "@/lib/supabase/fetchUser"; // Import the fetchUser function

export default async function Home() {
  const user: CustomUser = await fetchUser();
  return (
    <main>
      <Header user={user} />
      <Promo />
    </main>
  );
}
