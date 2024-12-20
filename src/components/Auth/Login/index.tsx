"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Container, Button, Flex, Text } from "@radix-ui/themes";
import AddNoteModal from "@/components/Notes/AddNoteModal";
import NoteCard from "@/components/Notes/NoteCard";
import styles from "./styles.module.scss";

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");

      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        router.push("/auth/login");
        return;
      }

      const { data, error: notesError } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.user.id); // Access user ID properly

      if (notesError) {
        setError("Failed to fetch notes. Please try again later.");
      } else {
  //       Argument of type 'any[]' is not assignable to parameter of type 'SetStateAction<never[]>'.
  // Type 'any[]' is not assignable to type 'never[]'.
  //   Type 'any' is not assignable to type 'never'.ts(2345)
        setNotes(data || []);
      }

      setLoading(false);
    };

    fetchNotes();
  }, [router, supabase]);

//   Parameter 'newNote' implicitly has an 'any' type.ts(7006)
// (parameter) newNote: any
  const handleAddNote = async (newNote) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .insert(newNote)
        .select()
        .single();
      if (error) throw error;
      setNotes((prev) => [...prev, data]);
    } catch (err) {
      setError("Failed to add note. Please try again later.");
    }
  };

  const handleDeleteNote = async (id) => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      setError("Failed to delete note. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="none" mx="5" className={styles.dashboardContainer}>
      <Flex direction="column" gap="4">
        <Text size="4" weight="bold">
          Dashboard
        </Text>

        {/* Error Message */}
        {error && (
          <Text size="2" color="red">
            {error}
          </Text>
        )}

        {/* Add Note Button */}
        <Button onClick={() => setIsModalOpen(true)}>Add Note</Button>
        <AddNoteModal
        // Type '{ isOpen: boolean; onClose: () => void; onAddNote: (newNote: any) => Promise<void>; }' is not assignable to type 'IntrinsicAttributes & AddNoteModalProps'.
        // Property 'isOpen' does not exist on type 'IntrinsicAttributes & AddNoteModalProps'.ts(2322)
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddNote={handleAddNote}
        />

        {/* Notes List */}
        {loading ? (
          <Text size="3">Loading notes...</Text>
        ) : (
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
        )}
      </Flex>
    </Container>
  );
};

export default DashboardPage;
