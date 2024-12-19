import React, { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./styles.module.scss";
import { TextField, Text } from "@radix-ui/themes";

interface SearchModalProps {
  onCompanySelect: (ticker: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onCompanySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<{ name: string; ticker: string }[]>(
    []
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const supabase = createClient();

  const handleSearch = async (query: string) => {
    if (query.length < 2) return;
    setLoading(true);
    setError("");
    setHasSearched(false);
    try {
      const { data, error } = await supabase
        .from("companies")
        .select("name, ticker")
        .or(`name.ilike.${query}%,ticker.ilike.${query}%`);
      if (error) throw error;

      setResults(data || []);
    } catch (err) {
      setError("Unable to fetch results. Please try again later.");
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) debouncedHandleSearch(value);
    else {
      setResults([]);
      setHasSearched(false);
    }
  };

  const handleCompanyClick = (ticker: string) => {
    onCompanySelect(ticker); // Pass the selected ticker
  };

  return (
    <div className={styles.modalContainer}>
      <label>
        <Text as="div" size="2" mb="2" weight="bold">
          Ticker
        </Text>
        <TextField.Root
          placeholder="Name or ticker, eg. NAVA"
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
            onClick={() => handleCompanyClick(company.ticker)}
          >
            {company.name} ({company.ticker})
          </li>
        ))}
      </ul>
      {hasSearched &&
        results.length === 0 &&
        searchTerm.length >= 2 &&
        !loading && (
          <p className={styles.noResults}>
            No results found for "{searchTerm}".
          </p>
        )}
    </div>
  );
};

export default SearchModal;
