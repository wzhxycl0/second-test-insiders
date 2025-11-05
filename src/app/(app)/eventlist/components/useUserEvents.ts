'use client';

import { useEffect, useState } from "react";
import { db } from "@/configs/firebase.config";
import { collection, where, orderBy, onSnapshot, query } from "firebase/firestore";
import { User } from "firebase/auth";

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: string;
}

export const useUserEvents = (user: User | null | undefined) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "events"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data: EventData[] = [];
      snap.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as EventData));
      setEvents(data);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  useEffect(() => {
    let filtered = [...events];

    if (priorityFilter !== "all") {
      filtered = filtered.filter((e) => e.priority === priorityFilter);
    }

    if (search.trim()) {
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );

    setFilteredEvents(filtered);
  }, [events, sortOrder, priorityFilter, search]);

  return {
    filteredEvents,
    loading,
    sortOrder,
    priorityFilter,
    search,
    setSortOrder,
    setPriorityFilter,
    setSearch,
  };
};
