import Ticker from "@/components/shared/Ticker";
import { TNote } from "@/types/Tnotes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Grid, IconButton, Text } from "@radix-ui/themes";

const Note = ({ note }: { note: TNote }) => (
  <Box>
    <Grid columns="5" gap="2" width="auto" align="center">
      <Text size="1" color="gray">
        {note.category}
      </Text>
      <Ticker ticker={note.ticker} isClickable />
      <Text size="1">{note.note}</Text>
      <Text size="1" color="gray">
        {new Date(note.created_at).toLocaleDateString()}
      </Text>
      <IconButton size="1" variant="ghost" style={{ marginLeft: "auto" }}>
        <DotsHorizontalIcon width="18" height="18" />
      </IconButton>
    </Grid>
    {/* <Button
        variant="soft"
        color="red"
        onClick={onDelete}
        style={{ marginTop: "auto" }}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </Button> */}
  </Box>
);

export default Note;
