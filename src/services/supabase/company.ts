// "use client";

// import Ticker from "@/components/shared/Ticker";
// import TickerSubscription from "@/components/shared/TickerSubscription";
// import { Flex, Text } from "@radix-ui/themes";
// import { useEffect, useState } from "react";
// import { createClient } from "@/lib/supabase/client";

// const CompanyPage = ({ params }: { params: Promise<{ ticker: string }> }) => {
//   const supabase = createClient();
//   const [ticker, setTicker] = useState<string | null>(null);
//   const [companyName, setCompanyName] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch ticker from params
//   useEffect(() => {
//     const fetchParams = async () => {
//       const resolvedParams = await params;
//       setTicker(resolvedParams.ticker.toUpperCase());
//     };

//     fetchParams();
//   }, [params]);

//   // Fetch company name
//   useEffect(() => {
//     const fetchCompanyName = async () => {
//       if (!ticker) return;

//       try {
//         const { data, error } = await supabase
//           .from("companies")
//           .select("name")
//           .eq("ticker", ticker)
//           .single();

//         if (error) {
//           console.error("Error fetching company name:", error);
//         } else {
//           setCompanyName(data?.name || null);
//         }
//       } catch (error) {
//         console.error("Failed to fetch company name:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanyName();
//   }, [ticker]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <Flex justify="between">
//         <div>
//           {ticker && <Ticker ticker={ticker} isExtended />}
//           {companyName && (
//             <Text as="p" size="2" color="gray">
//               {companyName}
//             </Text>
//           )}
//         </div>
//         <TickerSubscription ticker={ticker} />
//       </Flex>
//     </div>
//   );
// };

// export default CompanyPage;
