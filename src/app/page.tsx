import Hero from "@/components/Hero";
import { logout } from "./auth/logout/actions";

export default function Home() {
  return (
    <>
      <Hero />
      <form action={logout}>
        <button type="submit">logout</button>
      </form>
    </>
  );
}
