'use client';

import ButtonAppBar from "@/app/components/ButtonUpBar";

export default function ProtectedLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {
  return (<>
      <ButtonAppBar />
      {children}
  </>
  );
}
