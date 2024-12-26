"use client";

import { createClient } from "@/lib/supabase/client";
import { logError } from "@/utils/logger";
import * as Form from "@radix-ui/react-form";
import { Button, Dialog, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import LoadingButton from "@/components/shared/Buttons/LoadingButton";

interface AddNoteModalProps {
  userId: string;
  initialTicker?: string;
  onClose: () => void;
  isOpen: boolean;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  userId,
  initialTicker = "",
  onClose,
  isOpen,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(initialTicker);
  const [tickerResults, setTickerResults] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  useEffect(() => {
    if (searchTerm.length < 2) {
      setTickerResults([]);
      return;
    }

    const fetchTickers = async () => {
      try {
        const { data, error } = await supabase
          .from("companies")
          .select("ticker")
          .ilike("ticker", `${searchTerm}%`)
          .limit(10);

        if (error) throw error;

        setTickerResults(data?.map((item) => item.ticker) || []);
      } catch (err) {
        logError("Failed to fetch ticker suggestions", err);
        setTickerResults([]);
      }
    };

    const debounceFetch = setTimeout(fetchTickers, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchTerm, supabase]);

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

      onClose();
    } catch (err) {
      logError("AddNoteModal: Failed to save note", err);
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
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <Form.Field name="ticker">
              <div className="form-field-header">
                <Form.Label>Ticker</Form.Label>
                <Form.Message match="valueMissing">
                  Ticker is required
                </Form.Message>
              </div>
              <input
                className="input"
                type="text"
                name="ticker"
                placeholder="Enter ticker symbol"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                onFocus={() =>
                  searchTerm.length >= 2 && setIsDropdownOpen(true)
                }
                autoComplete="off"
                required={!initialTicker}
                disabled={!!initialTicker}
              />
            </Form.Field>
            {isDropdownOpen && tickerResults.length > 0 && (
              <ul
                className="dropdown"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  zIndex: 1050,
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
              >
                {tickerResults.map((ticker) => (
                  <li
                    key={ticker}
                    onClick={() => {
                      setSearchTerm(ticker);
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      padding: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    {ticker}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Form.Field name="note">
            <div className="form-field-header">
              <Form.Label>Note</Form.Label>
              <Form.Message match="valueMissing">
                Note cannot be empty
              </Form.Message>
            </div>
            <textarea
              className="textarea"
              name="note"
              placeholder="Enter your note"
              required
            />
          </Form.Field>

          <Form.Field name="category">
            <div className="form-field-header">
              <Form.Label>Category</Form.Label>
              <Form.Message match="valueMissing">
                Category is required
              </Form.Message>
            </div>
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
              <LoadingButton text="Save" type="submit" loading={isSubmitting} />
            </Form.Submit>
          </div>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddNoteModal;
