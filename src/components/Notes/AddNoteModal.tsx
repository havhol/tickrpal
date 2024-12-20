"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Dialog, Button, Text } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { Note } from "@/types/notes";

interface AddNoteModalProps {
  userId: string;
  initialTicker?: string; // Optional initial ticker if modal opens from a ticker page
  onClose: () => void;
  onAddNote: (
    newNote: Omit<Note, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  isOpen: boolean;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  userId,
  initialTicker = "",
  onClose,
  onAddNote,
  isOpen,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "General",
    "Company-specific",
    "Shareholder-specific",
    "Triggers",
    "Positive",
    "Negative",
    "Trading Signals",
  ];

  const supabase = createClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const ticker = formData.get("ticker") as string;
    const note = formData.get("note") as string;
    const category = formData.get("category") as string;

    try {
      const { error } = await supabase.from("notes").insert({
        user_id: userId,
        ticker: ticker.toUpperCase(),
        note,
        category,
      });

      if (error) throw error;

      await onAddNote({ ticker, note, category });
      onClose(); // Close modal after successful save
    } catch (err) {
      setError("Failed to save the note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content>
        <Dialog.Title>Add a Note</Dialog.Title>
        <Dialog.Description>
          Add details about your note below.
        </Dialog.Description>

        <Form.Root className="form-root" onSubmit={handleSubmit}>
          {/* Ticker Field */}
          <Form.Field name="ticker">
            <div className="form-field-header">
              <Form.Label>Ticker</Form.Label>
              <Form.Message match="valueMissing">
                Ticker is required
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="input"
                type="text"
                name="ticker"
                placeholder="Enter ticker symbol"
                defaultValue={initialTicker}
                required={!initialTicker} // Only required if no initial ticker
                disabled={!!initialTicker} // Disable if initial ticker is provided
              />
            </Form.Control>
          </Form.Field>

          {/* Note Field */}
          <Form.Field name="note">
            <div className="form-field-header">
              <Form.Label>Note</Form.Label>
              <Form.Message match="valueMissing">
                Note cannot be empty
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea
                className="textarea"
                name="note"
                placeholder="Enter your note"
                required
              />
            </Form.Control>
          </Form.Field>

          {/* Category Field */}
          <Form.Field name="category">
            <div className="form-field-header">
              <Form.Label>Category</Form.Label>
              <Form.Message match="valueMissing">
                Category is required
              </Form.Message>
            </div>
            <Form.Control asChild>
              <select
                className="select"
                name="category"
                defaultValue={categories[0]}
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </Form.Control>
          </Form.Field>

          {error && (
            <Text color="red" mt="4">
              {error}
            </Text>
          )}

          <div className="form-actions">
            <Button variant="soft" onClick={onClose}>
              Cancel
            </Button>
            <Form.Submit asChild>
              <Button
                variant="solid"
                color="blue"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </Form.Submit>
          </div>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddNoteModal;