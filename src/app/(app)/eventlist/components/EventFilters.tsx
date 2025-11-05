'use client';

import { Box, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  priorityFilter: string;
  setPriorityFilter: (val: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (val: "asc" | "desc") => void;
}

export default function EventFilters({
                                       search,
                                       setSearch,
                                       priorityFilter,
                                       setPriorityFilter,
                                       sortOrder,
                                       setSortOrder,
                                     }: Props) {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
      />

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          label="Priority"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="important">Important</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Sort</InputLabel>
        <Select
          label="Sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <MenuItem value="desc">Newest first</MenuItem>
          <MenuItem value="asc">Oldest first</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
}
