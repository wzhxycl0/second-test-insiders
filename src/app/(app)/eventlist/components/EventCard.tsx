'use client';

import { Paper, Typography, Box, Chip, Divider, Button } from "@mui/material";
import { EventData } from "./useUserEvents";

export default function EventCard({
                                    event,
                                    onEdit,
                                    onDelete,
                                  }: {
  event: EventData;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "important":
        return "warning";
      case "critical":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        borderLeft: "5px solid",
        borderColor:
          event.priority === "critical"
            ? "error.main"
            : event.priority === "important"
              ? "warning.main"
              : "grey.400",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">{event.title}</Typography>
        <Chip label={event.priority} color={getPriorityColor(event.priority)} size="small" />
      </Box>

      <Typography variant="body2" color="text.secondary">
        {event.date} • {event.time}
      </Typography>

      <Divider />

      <Typography variant="body1">{event.description}</Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
        <Button size="small" onClick={onEdit}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
      </Box>
    </Paper>
  );
}
