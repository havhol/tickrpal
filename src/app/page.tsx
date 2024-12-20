import Promo from "@/components/Promo";
import { logout } from "./auth/logout/actions";

export default function Home() {
  return (
    <>
      <Promo />
      <form action={logout}>
        <button type="submit">logout</button>
      </form>
    </>
  );
}
