"use client";

import Notes from "@/components/Dashboard/Notes/Notes";
import Tradelist from "@/components/Dashboard/Trades";
import Watchlist from "@/components/Dashboard/WatchList";
import UserCard from "@/components/shared/UserCard";
import { useAuth } from "@/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { NoteViewModel } from "@/types/Tnotes";
import { Container, Flex, Grid, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { user, isLoading } = useAuth();
  const [notes, setNotes] = useState<NoteViewModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // todo: I think this is redundant
    if (!user || isLoading) return;

    const fetchNotes = async () => {
      try {
        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        setNotes(data || []);
      } catch {
        setFetchError("Failed to fetch notes. Please try again later.");
      }
    };

    fetchNotes();

    const notesSubscription = supabase
      .channel("public:notes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setNotes((prev) => [...prev, payload.new as Note]);
          }
          if (payload.eventType === "DELETE") {
            setNotes((prev) =>
              prev.filter((note) => note.id !== (payload.old as Note).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notesSubscription);
    };
  }, [user, isLoading, supabase]);

  console.log("debug notes", notes);

  const handleDeleteNote = async (id: string) => {
    setIsDeleting(id);
    setFetchError(null);

    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;
    } catch {
      setFetchError("Failed to delete note. Please try again later.");
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (!user) return <Text color="red">Failed to fetch user.</Text>;

  return (
    <Container maxWidth="none">
      <Flex mb="5">
        <UserCard user={user} />
      </Flex>

      <Flex mb="5">
        <Grid columns="3" gap="3" width="auto">
          <Notes notes={notes} />
          <Watchlist />
          <Tradelist />
        </Grid>
      </Flex>
    </Container>
  );
};

export default DashboardPage;
