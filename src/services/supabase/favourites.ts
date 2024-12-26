import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const fetchFavourites = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("favourites")
    .select("ticker")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching favourites:", error);
    throw error;
  }

  return data || [];
};

export const checkFavourite = async (
  userId: string,
  ticker: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("favourites")
      .select("id")
      .eq("user_id", userId)
      .eq("ticker", ticker)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking favourite status:", error);
    }
    return !!data;
  } catch (error) {
    console.error("Failed to check favourite status:", error);
    return false;
  }
};

export const addFavourite = async (
  userId: string,
  ticker: string
): Promise<void> => {
  const { error } = await supabase
    .from("favourites")
    .insert([{ user_id: userId, ticker }]);
  if (error) {
    console.error("Error adding favourite:", error);
    throw error;
  }
};

export const removeFavourite = async (
  userId: string,
  ticker: string
): Promise<void> => {
  const { error } = await supabase
    .from("favourites")
    .delete()
    .eq("user_id", userId)
    .eq("ticker", ticker);

  if (error) {
    console.error("Error removing favourite:", error);
    throw error;
  }
};
