import { TNote } from "@/types/Tnotes";
import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { RiAddLine } from "@remixicon/react";
import AddNoteModal from "./AddNoteModal";
import Note from "./Note";
import { useAuth } from "@/context/AuthProvider";
import appRoutes from "@/config/appRoutes";

interface NotesProps {
  notes: TNote[];
  //   handleDeleteNote: (noteId: string) => void;
  //   isDeleting: string | null;
}

const Notes: React.FC<NotesProps> = ({
  notes,
  //   handleDeleteNote,
  //   isDeleting,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <Box>
      <AddNoteModal
        userId={user?.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {notes.length > 0 && (
        <Card size="4">
          <Flex justify="between">
            <Box>
              <Heading size="5" mb="2">
                Notes
              </Heading>
              <Text as="div" size="2">
                Your most recent added notes
              </Text>
            </Box>
            <Flex direction="column" gap="5">
              <IconButton onClick={() => setIsModalOpen(true)} variant="soft">
                <RiAddLine size={16} />
              </IconButton>
            </Flex>
          </Flex>
          <Box mb="5" mt="5">
            <Separator size="4" />
          </Box>

          {notes.map((note) => (
            <Box key={note.id}>
              <Note note={note} />
              <Separator orientation="horizontal" size="4" />
            </Box>
          ))}
          <Flex justify="end" mt="6">
            <Link href={appRoutes.dashboard.notes} size="1">
              All notes
            </Link>
          </Flex>
        </Card>
      )}
    </Box>
  );
};

export default Notes;
