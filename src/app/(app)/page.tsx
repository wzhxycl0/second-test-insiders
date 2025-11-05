'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configs/firebase.config";
import { redirect } from "next/navigation";
import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import DayModal from "@/app/components/DayModal";
import { useCalendar } from "./components/useCalendar";

export default function CalendarPage() {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const { year, month, monthName, days, nextMonth, prevMonth } = useCalendar();

  useEffect(() => {
    if (!loading && !user) redirect("/auth");
  }, [user, loading]);

  return (
    <Paper sx={{ padding: "50px" }}>
      <Typography variant="h3" textAlign="center">
        Welcome {user?.email}
      </Typography>

      <CalendarHeader
        monthName={monthName}
        year={year}
        onNext={nextMonth}
        onPrev={prevMonth}
      />

      <DayModal
        open={open}
        setOpen={setOpen}
        selectedDate={selectedDate}
        user={user!}
      />

      <CalendarGrid
        days={days}
        month={month}
        onSelectDay={(day) => {
          setSelectedDate(`${year}-${month + 1}-${day}`);
          setOpen(true);
        }}
      />
    </Paper>
  );
}
