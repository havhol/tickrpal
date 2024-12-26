import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

// interface NotesPageProps {
//   params: { ticker: string };
// }

const NotesPage = async () => {
  //   const { ticker } = params;

  //   const caseSensitiveTicker = ticker?.toUpperCase();

  //   const supabase = await createClient();
  //   const { data, error } = await supabase
  //     .from("companies")
  //     .select("name, ticker")
  //     .eq("ticker", caseSensitiveTicker)
  //     .single();

  //   if (!data || error) {
  //     console.log("log data error", data, error);
  //     notFound(); // Redirect to 404 if company is not found
  //   }

  return (
    <div>
      <h1>All notes</h1>
    </div>
  );
};

export default NotesPage;
