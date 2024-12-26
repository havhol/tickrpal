"use client";

import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { User } from "@supabase/supabase-js"; // Assuming you use Supabase's User type
import React from "react";

interface UserCardProps {
  user: User;
  menuItems?: { label: string; onClick: () => void }[];
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  //   const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box width="400px">
      <Card size="2">
        <Flex gap="4" align="center">
          <Avatar
            size="4"
            radius="full"
            fallback={user.email?.[0]?.toUpperCase() ?? "T"}
            // color="indigo"
          />
          <Box>
            <Text as="div" size="2">
              {user?.email ?? ""}
            </Text>
            <Text as="div" color="gray" size="1">
              Add your unique username
            </Text>
          </Box>
        </Flex>
      </Card>
      {/* Dropdown Menu */}
      {/* <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
    <DropdownMenu.Trigger>
      <DotsVerticalIcon />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      {menuItems.map((item, index) => (
        <DropdownMenu.Item
          key={index}
          onClick={item.onClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          {item.label === "Log out" ? <ExitIcon /> : <PersonIcon />}
          {item.label}
        </DropdownMenu.Item>
      ))}
    </DropdownMenu.Content>
  </DropdownMenu.Root> */}
    </Box>
  );
};

export default UserCard;
