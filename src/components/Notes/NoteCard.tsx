import { Card, Flex, Button, Text } from "@radix-ui/themes";

interface NoteCardProps {
  note: {
    id: string;
    ticker: string;
    note: string;
    category: string;
    created_at: string;
  };
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => (
  <Card variant="surface" shadow="sm" p="4">
    <Flex direction="column" gap="2">
      <Text size="3" weight="bold">
        {note.ticker}
      </Text>
      <Text size="2" color="gray">
        {note.category}
      </Text>
      <Text size="2">{note.note}</Text>
      <Text size="1" color="gray">
        {new Date(note.created_at).toLocaleDateString()}
      </Text>

      <Button
        variant="soft"
        color="red"
        onClick={onDelete}
        style={{ marginTop: "auto" }}
      >
        Delete
      </Button>
    </Flex>
  </Card>
);

export default NoteCard;
