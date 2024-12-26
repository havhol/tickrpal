"use client";

import React from "react";
import Link from "next/link"; // Import Link from Next.js
import { Flex, Text, IconButton } from "@radix-ui/themes";
import { RiStarLine, RiStarFill } from "@remixicon/react";
import ManageFavourite from "./ManageFavourite";

// Added `isClickable` to props
interface TickerProps {
  ticker: string;
  companyName?: string; // Optional company name
  isFavourited?: boolean; // Control if a star icon is shown
  showSubscriptionButton?: boolean; // Control if subscribe/unsubscribe button is shown
  isClickable?: boolean; // Wrap component in a link if true
}

const Ticker: React.FC<TickerProps> = ({
  ticker,
  companyName,
  isFavourited = false,
  showSubscriptionButton = false,
  isClickable = false,
}) => {
  const content = (
    <Flex align="center" gap="2">
      {/* Render the ticker */}
      <Text size="2" weight="bold">
        {ticker}
      </Text>

      {/* Render the company name if provided */}
      {companyName && (
        <Text size="2" color="gray">
          ({companyName})
        </Text>
      )}

      {/* Render the star icon if `isFavourited` is true */}
      {isFavourited && (
        <IconButton
          variant="ghost"
          aria-label={isFavourited ? "Unfavourite" : "Favourite"}
        >
          {isFavourited ? <RiStarFill size={16} /> : <RiStarLine size={16} />}
        </IconButton>
      )}

      {/* Render the subscription button if `showSubscriptionButton` is true */}
      {showSubscriptionButton && <ManageFavourite ticker={ticker} />}
    </Flex>
  );

  // If `isClickable` is true, wrap in a link
  if (isClickable) {
    return <Link href={`/dashboard/company/${ticker}`}>{content}</Link>;
  }

  // Otherwise, return plain content
  return content;
};

export default Ticker;
