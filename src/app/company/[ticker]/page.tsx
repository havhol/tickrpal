import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface CompanyPageProps {
  params: { ticker: string };
}

const CompanyPage = async ({ params }: CompanyPageProps) => {
  const { ticker } = params;

  const caseSensitiveTicker = ticker?.toUpperCase();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("name, ticker")
    .eq("ticker", caseSensitiveTicker)
    .single();

  if (!data || error) {
    console.log("log data error", data, error);
    notFound(); // Redirect to 404 if company is not found
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Ticker: {data.ticker}</p>
      {/* Add other company details here */}
    </div>
  );
};

export default CompanyPage;
