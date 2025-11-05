'use client';

import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/configs/firebase.config";

export default function DeleteDialog({
                                       id,
                                       onClose,
                                     }: {
  id: string | null;
  onClose: () => void;
}) {
  const handleDelete = async () => {
    if (!id) return;
    await deleteDoc(doc(db, "events", id));
    onClose();
  };

  return (
    <Dialog open={!!id} onClose={onClose}>
      <DialogTitle>Delete this event?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
