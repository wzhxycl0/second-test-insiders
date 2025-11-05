'use client';

import { Box, Button, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface CalendarHeaderProps {
  monthName: string;
  year: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function CalendarHeader({
                                         monthName,
                                         year,
                                         onNext,
                                         onPrev,
                                       }: CalendarHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mt: 3,
        mb: 2,
      }}
    >
      <Button onClick={onPrev} startIcon={<ChevronLeft />} variant="outlined">
        Prev
      </Button>

      <Typography variant="h4" textAlign="center">
        {monthName} {year}
      </Typography>

      <Button onClick={onNext} endIcon={<ChevronRight />} variant="outlined">
        Next
      </Button>
    </Box>
  );
}
