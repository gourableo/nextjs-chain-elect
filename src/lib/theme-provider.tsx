"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ComponentProps, useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  if (!isClientSide) return <>{children}</>;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
