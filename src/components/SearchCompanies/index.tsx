"use client";

import { useState } from "react";
import { TextField, Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { RiSearchLine } from "@remixicon/react";
import styles from "./styles.module.scss";

// Dummy data
const companies = [
  { name: "Equinor ASA", ticker: "EQNR" },
  { name: "DNB ASA", ticker: "DNB" },
  { name: "Telenor ASA", ticker: "TEL" },
  { name: "Aker BP ASA", ticker: "AKRBP" },
  { name: "Yara International ASA", ticker: "YAR" },
];

const SearchCompanies = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter companies based on the search term
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      style={{
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      {/* Search Input */}
      <TextField.Root
        variant="soft"
        radius="full"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%" }}
        size="3"
      >
        <TextField.Slot>
          <RiSearchLine size={14} />
        </TextField.Slot>
      </TextField.Root>

      {/* Results Container */}
      {searchTerm && (
        <Box mt="4" p="2" className={styles.results}>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <Card key={company.ticker} mb="2" px="3" py="2">
                <Flex justify="between">
                  <Text>{company.name}</Text>
                  <Text color="gray">{company.ticker}</Text>
                </Flex>
              </Card>
            ))
          ) : (
            <Heading as="h5" size="2" align="center" color="gray">
              No results found
            </Heading>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchCompanies;
