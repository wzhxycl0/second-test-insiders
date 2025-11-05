'use client';

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import {theme} from "@/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
