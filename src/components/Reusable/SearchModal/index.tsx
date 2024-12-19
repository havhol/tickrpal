import React, { useState } from "react";
import { DialogContent, DialogClose } from "@radix-ui/react-dialog";
import { createClient } from "@/lib/supabase/client"; // Import your Supabase client
import styles from "./styles.module.scss";
import { TextField, Text } from "@radix-ui/themes";

interface SearchModalProps {
  onCompanySelect: (name: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onCompanySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<{ name: string; ticker: string }[]>(
    []
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("companies")
        .select("name, ticker")
        .ilike("name", `%${query}%`);
      if (error) throw error;

      setResults(data || []);
    } catch (err) {
      setError("Unable to fetch results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) handleSearch(value);
    else setResults([]);
  };

  const handleCompanyClick = (name: string) => {
    onCompanySelect(name);
  };

  return (
    <div className={styles.modalContainer}>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Company
        </Text>
        <TextField.Root
          placeholder="Company name or ticker"
          value={searchTerm}
          onChange={handleInputChange}
          autoFocus
        />
      </label>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.results}>
        {results.map((company) => (
          <li
            key={company.ticker}
            className={styles.resultItem}
            onClick={() => handleCompanyClick(company.name)}
          >
            {company.name} ({company.ticker})
          </li>
        ))}
      </ul>
      {results.length === 0 && searchTerm && !loading && (
        <p className={styles.noResults}>No results found for "{searchTerm}".</p>
      )}
    </div>
  );
};

export default SearchModal;
