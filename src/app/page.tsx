'use client';

import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/configs/firebase.config";
import {useEffect} from "react";
import {redirect} from "next/navigation";

export default function Home() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;

    if (!user) redirect('/auth');
  }, [user, loading]);

  return (
    <></>
  );
}
