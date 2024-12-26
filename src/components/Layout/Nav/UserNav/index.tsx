"use client";

import {
  MagnifyingGlassIcon,
  MoonIcon,
  QuestionMarkCircledIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { RiInbox2Line } from "@remixicon/react";

import { useEffect, useState } from "react";

import SearchModal from "@/components/shared/SearchModal";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

const UserNav = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOpen, setIsOpen] = useState(false); // Control dialog state

  const router = useRouter();

  const handleCompanySelect = (ticker: string) => {
    router.push(`/company/${ticker}`); // Use ticker as the parameter
    setIsOpen(false); // Close the modal
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    const initialTheme = storedTheme || "light";
    document.documentElement.className = initialTheme; // Set theme class on <html>
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.className = newTheme; // Update <html> class
    localStorage.setItem("theme", newTheme); // Save preference in localStorage
    setTheme(newTheme);
  };

  return (
    <nav className={styles.nav}>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger>
          <IconButton>
            <MagnifyingGlassIcon />
          </IconButton>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="450px" align="start">
          <Dialog.Title>Find company</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Start building your knowledge.
          </Dialog.Description>
          <Flex direction="column" gap="3">
            <SearchModal onCompanySelect={handleCompanySelect} />
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      {/* Theme Toggle */}
      <Button size="1" variant="soft" color="gray">
        Feedback
      </Button>
      <IconButton radius="full" variant="ghost" onClick={toggleTheme}>
        {theme === "light" ? <SunIcon /> : <MoonIcon />}
      </IconButton>
      <IconButton variant="ghost">
        <MagnifyingGlassIcon />
      </IconButton>
      <IconButton variant="ghost">
        <QuestionMarkCircledIcon />
      </IconButton>
      <IconButton variant="ghost">
        <RiInbox2Line size={15} />
      </IconButton>
    </nav>
  );
};

export default UserNav;
