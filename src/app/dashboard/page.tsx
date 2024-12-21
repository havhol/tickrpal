"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { Container, Button, Flex, Text } from "@radix-ui/themes";
import AddNoteModal from "@/components/Notes/AddNoteModal";
import NoteCard from "@/components/Notes/NoteCard";
import { Note } from "@/types/notes";

const DashboardPage = () => {
  const { user, isLoading } = useAuth(); // Omit `error` if unused
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Track which note is being deleted
  const [fetchError, setFetchError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
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
              prev.filter((note) => note.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notesSubscription);
    };
    // problem
    // React Hook useEffect has a missing dependency: 'supabase'. Either include it or remove the dependency array.
  }, [user, isLoading]);

  const handleAddNote = async (
    newNote: Omit<Note, "id" | "created_at" | "updated_at">
  ) => {
    try {
      const { error } = await supabase
        .from("notes")
        .insert({ ...newNote, user_id: user!.id });
      if (error) throw error;

      // Realtime subscription handles state update, no need to manually update state here
    } catch {
      setFetchError("Failed to add note. Please try again later.");
    }
  };

  const handleDeleteNote = async (id: string) => {
    setIsDeleting(id); // Set the note ID being deleted
    setFetchError(null); // Reset error state

    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;

      // No need to manually update `notes` if using real-time subscriptions
    } catch {
      setFetchError("Failed to delete note. Please try again later.");
    } finally {
      setIsDeleting(null); // Reset the loading state
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (!user) return <Text color="red">Failed to fetch user.</Text>;

  return (
    <Container maxWidth="none" mx="5">
      <Flex direction="column" gap="4">
        <Text size="4" weight="bold">
          Dashboard
        </Text>
        {fetchError && <Text color="red">{fetchError}</Text>}
        <Text size="3">Hello, {user.email}</Text>
        <Button onClick={() => setIsModalOpen(true)}>Add Note</Button>
        <AddNoteModal
          userId={user.id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddNote={handleAddNote}
        />
        <Flex direction="column" gap="3">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={() => handleDeleteNote(note.id)}
                isDeleting={isDeleting === note.id} // Pass loading state
              />
            ))
          ) : (
            <Text>No notes found. Add your first note!</Text>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default DashboardPage;
