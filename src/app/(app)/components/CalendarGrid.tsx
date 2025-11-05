'use client';

import { Paper } from "@mui/material";

interface CalendarGridProps {
  days: number[];
  month: number;
  onSelectDay: (day: number) => void;
}

export default function CalendarGrid({
                                       days,
                                       onSelectDay,
                                     }: CalendarGridProps) {
  return (
    <Paper
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "10px",
        mt: 4,
      }}
    >
      {days.map((day) => (
        <Paper
          key={day}
          onClick={() => onSelectDay(day)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60px",
            fontWeight: 500,
            cursor: "pointer",
            "&:hover": {
              border: "1px solid white",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          {day}
        </Paper>
      ))}
    </Paper>
  );
}
