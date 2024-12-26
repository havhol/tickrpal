import {
  HomeIcon,
  Pencil2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Avatar, Flex, IconButton, Separator } from "@radix-ui/themes";
import Link from "next/link";
import {
  RiChatThreadLine,
  RiCommandLine,
  RiOrganizationChart,
  RiSearchLine,
  RiSettings3Line,
  RiShieldUserFill,
  RiStickyNoteAddLine,
  RiTeamLine,
} from "@remixicon/react";
import appRoutes from "@/config/appRoutes";
import clsx from "clsx";

import styles from "./sidebar.module.scss";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <Flex direction="column" justify="between" height="100%">
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Link href={appRoutes.dashboard.root}>
                <IconButton size="3" variant="ghost" asChild>
                  <HomeIcon width="18" height="18" />
                </IconButton>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href={appRoutes.dashboard.root}>
                <IconButton size="3" variant="ghost" asChild>
                  <HomeIcon width="18" height="18" color="gray" />
                </IconButton>
              </Link>
            </li>
            <li className={clsx(styles.menuItem, styles.separator)}>
              <Separator size="4" />
            </li>
            <li className={styles.menuItem}>
              <Link href={appRoutes.dashboard.root}>
                <IconButton
                  size="1"
                  variant="ghost"
                  style={{ marginLeft: "auto" }}
                  asChild
                >
                  {/* <RiSearchLine /> */}
                  <MagnifyingGlassIcon />
                </IconButton>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href={appRoutes.dashboard.notes}>
                <IconButton
                  size="1"
                  variant="ghost"
                  style={{ marginLeft: "auto" }}
                  asChild
                >
                  {/* <RiStickyNoteAddLine /> */}
                  <Pencil2Icon />
                </IconButton>
              </Link>
            </li>

            <li className={styles.menuItem}>
              <Link href={appRoutes.dashboard.root}>
                <IconButton
                  size="1"
                  variant="ghost"
                  style={{ marginLeft: "auto" }}
                  asChild
                >
                  <RiChatThreadLine />
                </IconButton>
              </Link>
            </li>

            <li className={styles.menuItem}>
              <Link href={appRoutes.dashboard.root}>
                <IconButton
                  size="1"
                  variant="ghost"
                  style={{ marginLeft: "auto" }}
                  asChild
                >
                  <RiChatThreadLine />
                </IconButton>
              </Link>
            </li>
          </ul>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Link href={appRoutes.dashboard.root}>
                <IconButton size="3" variant="ghost" asChild>
                  <RiSettings3Line />
                </IconButton>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href={appRoutes.dashboard.root}>
                <IconButton size="3" variant="ghost" asChild>
                  <RiCommandLine />
                </IconButton>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href={appRoutes.dashboard.root}>
                <IconButton size="3" variant="ghost" asChild>
                  <RiTeamLine />
                </IconButton>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href={appRoutes.dashboard.root}>
                <IconButton size="3" variant="ghost" asChild>
                  <RiShieldUserFill />
                </IconButton>
              </Link>
            </li>
          </ul>
        </Flex>
      </nav>
    </div>
  );
}
