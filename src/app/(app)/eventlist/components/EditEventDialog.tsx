'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/firebase.config";
import { EventData } from "./useUserEvents";

export default function EditEventDialog({
                                          event,
                                          onClose,
                                        }: {
  event: EventData | null;
  onClose: () => void;
}) {
  const [data, setData] = useState<EventData | null>(null);

  useEffect(() => setData(event), [event]);

  const handleSave = async () => {
    if (!data) return;
    await updateDoc(doc(db, "events", data.id), {
      title: data.title,
      description: data.description,
      time: data.time,
      priority: data.priority,
    });
    onClose();
  };

  return (
    <Dialog open={!!event} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit event</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Title"
          value={data?.title || ""}
          onChange={(e) => setData((prev) => prev && { ...prev, title: e.target.value })}
        />
        <TextField
          label="Time"
          type="time"
          value={data?.time || ""}
          onChange={(e) => setData((prev) => prev && { ...prev, time: e.target.value })}
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={data?.description || ""}
          onChange={(e) => setData((prev) => prev && { ...prev, description: e.target.value })}
        />
        <TextField
          label="Priority"
          select
          value={data?.priority || "normal"}
          onChange={(e) => setData((prev) => prev && { ...prev, priority: e.target.value })}
        >
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="important">Important</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
