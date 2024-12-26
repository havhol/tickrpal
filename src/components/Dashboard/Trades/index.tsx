"use client";

import React, { useEffect, useState } from "react";
import { fetchFavourites } from "@/services/supabase/favourites";
import { useAuth } from "@/context/AuthProvider";
import { Text, Card, Flex } from "@radix-ui/themes";
import Ticker from "@/components/shared/Ticker";

const Tradelist = () => {
  const { user } = useAuth();
  const [favourites, setFavourites] = useState<{ ticker: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchFavourites(user.id);
        setFavourites(data);
      } catch (error) {
        console.error("Failed to fetch Tradelist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <Text>Loading Tradelist...</Text>;
  }

  if (!favourites.length) {
    return <Text>Your Tradelist is empty.</Text>;
  }

  return (
    <Card size="4" style={{ maxWidth: "600px" }}>
      <Text as="h2" size="4" weight="bold" mb="4">
        Your Tradelist
      </Text>
      <Flex direction="column" gap="2">
        {favourites.map(({ ticker }) => (
          <Ticker key={ticker} ticker={ticker} />
        ))}
      </Flex>
    </Card>
  );
};

export default Tradelist;
