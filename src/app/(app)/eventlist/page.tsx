'use client';

import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configs/firebase.config";
import { useUserEvents } from "./components/useUserEvents";
import EventFilters from "./components/EventFilters";
import EventCard from "./components/EventCard";
import EditEventDialog from "./components/EditEventDialog";
import DeleteDialog from "./components/DeleteDialog";
import { useState } from "react";
import { EventData } from "./components/useUserEvents";

export default function EventListPage() {
  const [user, loadingUser] = useAuthState(auth);
  const {
    filteredEvents,
    loading,
    setSearch,
    setPriorityFilter,
    setSortOrder,
    sortOrder,
    priorityFilter,
    search,
  } = useUserEvents(user);

  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  if (loadingUser || loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <EventFilters
        search={search}
        setSearch={setSearch}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {filteredEvents.length === 0 && (
        <Typography variant="h6" textAlign="center" mt={2}>
          No events found.
        </Typography>
      )}

      {filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={() => setEditingEvent(event)}
          onDelete={() => setConfirmDelete(event.id)}
        />
      ))}

      <EditEventDialog
        event={editingEvent}
        onClose={() => setEditingEvent(null)}
      />

      <DeleteDialog
        id={confirmDelete}
        onClose={() => setConfirmDelete(null)}
      />
    </Box>
  );
}
