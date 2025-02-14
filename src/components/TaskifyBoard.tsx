import { useState } from "react";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import KanbanLane from "./KanbanLane"; // ✅ Asegúrate de que el archivo existe
import { Box } from "@mui/material";

const initialData = [
  {
    id: "todo",
    title: "To Do",
    items: [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" }
    ]
  },
  {
    id: "in-progress",
    title: "In Progress",
    items: []
  },
  {
    id: "done",
    title: "Done",
    items: []
  }
];

const TaskifyBoard = () => {
  const [lanes, setLanes] = useState(initialData);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const sourceLaneIndex = lanes.findIndex((lane) =>
      lane.items.some((item) => item.id === active.id)
    );
    const destinationLaneIndex = lanes.findIndex((lane) => lane.id === over.id);

    if (sourceLaneIndex === -1 || destinationLaneIndex === -1) return;

    const sourceLane = { ...lanes[sourceLaneIndex] };
    const destinationLane = { ...lanes[destinationLaneIndex] };

    const itemIndex = sourceLane.items.findIndex((i) => i.id === active.id);
    if (itemIndex === -1) return;

    const item = sourceLane.items[itemIndex];

    // ✅ Removemos el item de la columna original
    sourceLane.items.splice(itemIndex, 1);

    // ✅ Agregamos el item a la nueva columna
    destinationLane.items = [...destinationLane.items, item];

    // ✅ Se actualiza el estado correctamente
    setLanes((prevLanes) => {
      const newLanes = [...prevLanes];
      newLanes[sourceLaneIndex] = sourceLane;
      newLanes[destinationLaneIndex] = destinationLane;
      return newLanes;
    });
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <SortableContext items={lanes.map((lane) => lane.id)} strategy={verticalListSortingStrategy}>
        <Box display="flex" gap={2}>
          {lanes.map((lane) => (
            <KanbanLane key={lane.id} lane={lane} />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default TaskifyBoard;
