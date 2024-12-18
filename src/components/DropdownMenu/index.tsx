import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import styles from "./styles.module.scss";
import { IconButton } from "@radix-ui/themes";

const InternalDropdownMenu = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

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
            New Tab <div className={styles.RightSlot}>⌘+T</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            New Window <div className={styles.RightSlot}>⌘+N</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem} disabled>
            New Private Window <div className={styles.RightSlot}>⇧+⌘+N</div>
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={styles.DropdownMenuSubTrigger}>
              More Tools
              <div className={styles.RightSlot}>
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={styles.DropdownMenuSubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                  Save Page As… <div className={styles.RightSlot}>⌘+S</div>
                </DropdownMenu.Item>
                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                  Create Shortcut…
                </DropdownMenu.Item>
                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                  Name Window…
                </DropdownMenu.Item>
                <DropdownMenu.Separator
                  className={styles.DropdownMenuSeparator}
                />
                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                  Developer Tools
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />

          <DropdownMenu.CheckboxItem
            className={styles.DropdownMenuCheckboxItem}
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <DropdownMenu.ItemIndicator
              className={styles.DropdownMenuItemIndicator}
            >
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Show Bookmarks <div className={styles.RightSlot}>⌘+B</div>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            className={styles.DropdownMenuCheckboxItem}
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <DropdownMenu.ItemIndicator
              className={styles.DropdownMenuItemIndicator}
            >
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Show Full URLs
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />

          <DropdownMenu.Label className={styles.DropdownMenuLabel}>
            People
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
            <DropdownMenu.RadioItem
              className={styles.DropdownMenuRadioItem}
              value="pedro"
            >
              <DropdownMenu.ItemIndicator
                className={styles.DropdownMenuItemIndicator}
              >
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Pedro Duarte
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className={styles.DropdownMenuRadioItem}
              value="colm"
            >
              <DropdownMenu.ItemIndicator
                className={styles.DropdownMenuItemIndicator}
              >
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Colm Tuite
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default InternalDropdownMenu;
