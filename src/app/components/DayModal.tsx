'use client';

import {Box, Button, Modal, Typography, TextField, MenuItem} from "@mui/material";
import {useForm} from "react-hook-form";
import {User} from "@firebase/auth";
import {addDoc, collection} from "@firebase/firestore";
import {db} from "@/configs/firebase.config";

interface DayModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedDate?: string;
  user: User;
}

type DayModalForm = {
  title: string,
  time: string,
  description: string,
  priority: string,
}

export default function DayModal({open, setOpen, selectedDate, user}: DayModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<DayModalForm>();

  const onSubmit = async (data: DayModalForm) => {
    try {
      const eventData = {
        ...data,
        date: selectedDate,
        userId: user?.uid,
      };

      await addDoc(collection(db, "events"), eventData);

      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          minWidth: 350,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Add new event
        </Typography>

        <TextField
          label="Event title"
          {...register('title', {required: 'Title is required'})}
          error={!!errors.title}
          helperText={errors.title?.message?.toString()}
        />

        <TextField
          label="Time"
          type="time"
          {...register('time', {required: 'Time is required'})}
          error={!!errors.time}
          helperText={errors.time?.message?.toString()}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          {...register('description', {
            required: 'Description is required',
            minLength: {value: 5, message: 'Minimum 5 characters'},
          })}
          error={!!errors.description}
          helperText={errors.description?.message?.toString()}
        />

        <TextField
          label="Priority"
          select
          defaultValue="normal"
          {...register('priority', {required: true})}
        >
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="important">Important</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </TextField>

        <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2}}>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
