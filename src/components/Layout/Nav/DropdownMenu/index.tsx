import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import React from "react";
import styles from "./styles.module.scss";
import { logout } from "@/app/auth/logout/actions";

const InternalDropdownMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton radius="full" variant="soft">
          <HamburgerMenuIcon />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.DropdownMenuContent}
          sideOffset={5}
        >
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            havholmail
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            Dashboard
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            Playground
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            Cheatsheet
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            Account
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />
          <DropdownMenu.Item
            className={styles.DropdownMenuItem}
            onClick={logout}
          >
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default InternalDropdownMenu;
