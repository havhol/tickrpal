"use client";

import Ticker from "@/components/shared/Ticker";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const CompanyPage = ({ params }: { params: Promise<{ ticker: string }> }) => {
  const [ticker, setTicker] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setTicker(resolvedParams.ticker.toUpperCase());
    };

    fetchParams();
  }, [params]);

  // Is it time to start look into context providers?
  // I have a scenario here where I need data from the favourite table in two components,
  // both the Ticker component and the TickerSubscription component - and they need to be to separate components
  // By fetching data from the favourite table in both components sounds like not the ideal way to go, do you agree? How can I start structuring my fetching better?

  return (
    <div>
      <Flex justify="between">
        {ticker && <Ticker ticker={ticker} />}
        {/* <TickerSubscription ticker={ticker} /> */}
      </Flex>
    </div>
  );
};

export default CompanyPage;
