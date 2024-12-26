import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button, Spinner } from "@radix-ui/themes";
import React from "react";

interface LoadingButtonProps {
  text: string;
  isLoading: boolean;
  onClick?: () => void; // Optional, for cases when the button is not used in a form
  type?: "button" | "submit" | "reset"; // Specify button type
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  text,
  isLoading,
  onClick,
  type = "button", // Default type is "button"
}) => {
  return (
    <Button
      {...(onClick && { onClick })}
      type={type}
      disabled={isLoading} // Disable button when loading
      variant="outline"
    >
      {isLoading && (
        <Spinner>
          <BookmarkIcon />
        </Spinner>
      )}
      {text ?? "Button"}
    </Button>
  );
};

export default LoadingButton;
