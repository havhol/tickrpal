"use client";

import { Button, Dialog, Flex, IconButton, Link } from "@radix-ui/themes";
import { RiCommandLine, RiSettings3Line } from "@remixicon/react";
import { SunIcon, MoonIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import InternalDropdownMenu from "@/components/DropdownMenu";
import { DialogTrigger } from "@radix-ui/react-dialog";
import SearchModal from "@/components/Reusable/SearchModal";
import { useRouter } from "next/navigation";

const UserNav = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const router = useRouter();

  const handleCompanySelect = (name: string) => {
    router.push(`/company/${name}`);
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
      <Link href="/dashboard" color="gray">
        Dashboard
      </Link>
      <Link href="/dashboard" color="gray">
        Playground
      </Link>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>
            <MagnifyingGlassIcon /> Search
          </Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="450px" align="start">
          <Dialog.Title>Find company</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            And start building your knowledge
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

      <IconButton radius="full" variant="soft" onClick={toggleTheme}>
        <RiCommandLine size={15} color="currentColor" />
      </IconButton>
      <IconButton radius="full" variant="soft" onClick={toggleTheme}>
        <RiSettings3Line size={18} />
      </IconButton>
      {/* Theme Toggle */}
      <IconButton radius="full" variant="soft" onClick={toggleTheme}>
        {theme === "light" ? <SunIcon /> : <MoonIcon />}
      </IconButton>
      <InternalDropdownMenu />
    </nav>
  );
};

export default UserNav;
