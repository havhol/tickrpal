"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { logError } from "@/utils/logger";
import { Container, Button, Flex, Text } from "@radix-ui/themes";
import AddNoteModal from "@/components/Notes/AddNoteModal";
import NoteCard from "@/components/Notes/NoteCard";
import { Note } from "@/types/notes";

const DashboardPage: React.FC = () => {
  const { user, isLoading, error } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (!user) return;

    const fetchNotes = async () => {
      try {
        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;
        setNotes(data || []);
      } catch (err) {
        logError("Fetching Notes", err);
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
          if ("new" in payload && "old" in payload) {
            switch (payload.eventType) {
              case "INSERT":
                setNotes((prev) => [...prev, payload.new as Note]);
                break;
              case "DELETE":
                setNotes((prev) =>
                  prev.filter((note) => note.id !== payload.old.id)
                );
                break;
              case "UPDATE":
                setNotes((prev) =>
                  prev.map((note) =>
                    note.id === payload.new.id ? (payload.new as Note) : note
                  )
                );
                break;
              default:
                break;
            }
          } else {
            logError("Invalid Payload", payload);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notesSubscription);
    };
  }, [user, supabase]);

  const handleAddNote = async (
    newNote: Omit<Note, "id" | "created_at" | "updated_at">
  ) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .insert({ ...newNote, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      setNotes((prev) => [...prev, data]);
    } catch (err) {
      logError("Adding Note", err);
      setFetchError("Failed to add note. Please try again later.");
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      logError("Deleting Note", err);
      setFetchError("Failed to delete note. Please try again later.");
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}</Text>;

  return (
    <Container maxWidth="none" mx="5">
      <Flex direction="column" gap="4">
        <Text size="4" weight="bold">
          Dashboard
        </Text>

        {fetchError && (
          <Text size="2" color="red">
            {fetchError}
          </Text>
        )}

        {user && (
          <>
            <Text size="3">Hello, {user.email}</Text>
            <Button onClick={() => setIsModalOpen(true)}>Add Note</Button>
            <AddNoteModal
              userId={user.id}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onAddNote={handleAddNote}
            />
          </>
        )}

        <Flex direction="column" gap="3">
          {notes.length ? (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))
          ) : (
            <Text size="3">No notes found. Add your first note!</Text>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default DashboardPage;
