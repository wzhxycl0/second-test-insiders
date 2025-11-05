'use client';

import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/configs/firebase.config";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {Paper, Typography} from '@mui/material';
import {getDaysInMonth} from "@/app/utils/getDaysInMonth.util";
import DayModal from "@/app/components/DayModal";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    if (loading) return;

    if (!user) redirect('/auth');
  }, [user, loading]);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = new Date(2025, month).toLocaleString('en-EN', { month: 'long' });

  const days = Array.from({ length: getDaysInMonth(year, month)-1 }, (_, i) => i + 1);

  return (
    <Paper sx={{
      padding: '50px'
    }}>
      <Typography sx={{
        textAlign: 'center'
      }} variant='h3'>Welcome {user?.email}</Typography>

      <Typography variant='h4' sx={{
        textAlign: 'center'
      }}>{monthName}</Typography>

      <DayModal open={open} setOpen={setOpen} selectedDate={selectedDate} user={user!} />

      <Paper
        sx={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '10px',
          mt: 4
        }}
      >

        {days.map(day => (
          <Paper
            key={day}
            onClick={() => {
              setOpen(true)
              setSelectedDate(`${month}.${day}`)
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60px',
              fontWeight: 500,
              cursor: 'pointer',
              '&:hover': {
                border: 'white 1px solid'
              }
            }}
          >
            {day}
          </Paper>
        ))}
      </Paper>

    </Paper>
  );
}
