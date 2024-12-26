import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button, Spinner } from "@radix-ui/themes";
import React, { useState } from "react";

const LoadingButtonAdvanced = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => Promise<void>; // Ensure onClick returns a Promise
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick(); // Wait for the onClick function to complete
    } catch (error) {
      console.error("Error in LoadingButton:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading} // Disable button when loading
      variant="surface"
      highContrast
    >
      {isLoading ? (
        <Spinner>
          <BookmarkIcon />
        </Spinner>
      ) : (
        <BookmarkIcon />
      )}
      {text ?? "text"}
    </Button>
  );
};

export default LoadingButtonAdvanced;
