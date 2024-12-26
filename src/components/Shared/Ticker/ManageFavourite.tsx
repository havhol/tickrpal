"use client";

import LoadingButton from "@/components/shared/Buttons/LoadingButton"; // Assuming you have a custom LoadingButton component
import { useAuth } from "@/context/AuthProvider";
import {
  addFavourite,
  checkFavourite,
  removeFavourite,
} from "@/services/supabase/favourites";

import { useEffect, useState } from "react";

const ManageFavourite = ({ ticker }: { ticker: string | null }) => {
  const { user } = useAuth();

  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false); // Loading for add/remove actions

  // Check if the ticker is already a favourite
  useEffect(() => {
    const fetchFavouriteStatus = async () => {
      if (!user || !ticker) {
        setLoading(false);
        return;
      }
      const isFav = await checkFavourite(user.id, ticker);
      setIsFavourite(isFav);
      setLoading(false);
    };

    fetchFavouriteStatus();
  }, [user, ticker]);

  const handleAdd = async () => {
    if (!user) return alert("Please log in to add to favourites");

    setActionLoading(true);
    try {
      await addFavourite(user.id, ticker!);
      setIsFavourite(true);
    } catch (error) {
      console.error("Failed to add to favourites:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!user) return alert("Please log in to remove from favourites");

    setActionLoading(true);
    try {
      await removeFavourite(user.id, ticker!);
      setIsFavourite(false);
    } catch (error) {
      console.error("Failed to remove from favourites:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {isFavourite ? (
        <>
          <LoadingButton
            onClick={handleRemove}
            isLoading={actionLoading}
            text="Remove from favourites"
          />
        </>
      ) : (
        <LoadingButton
          onClick={handleAdd}
          isLoading={actionLoading}
          text="Add to favourites"
        />
      )}
    </div>
  );
};

export default ManageFavourite;
