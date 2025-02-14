import { Box, Typography, Card, CardContent } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";

interface LaneProps {
  lane: {
    id: string;
    title: string;
    items: { id: string; title: string }[];
  };
}

const KanbanLane = ({ lane }: LaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lane.id });

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        width: 250,
        minHeight: 400,
        backgroundColor: "#f5f5f5",
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition
      }}
    >
      <Typography variant="h6">{lane.title}</Typography>
      {lane.items.map((item) => (
        <Card key={item.id} sx={{ marginTop: 1, backgroundColor: "white" }}>
          <CardContent>{item.title}</CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default KanbanLane;
