import { Button } from "@radix-ui/themes";

const AddNoteButton = ({ onOpen }: { onOpen: () => void }) => (
  <Button onClick={onOpen}>Add Note</Button>
);

export default AddNoteButton;
