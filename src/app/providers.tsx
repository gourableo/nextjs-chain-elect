"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";
import { config } from "@/wagmi.config";
import { ThemeProvider } from "@/lib/theme-provider";

const queryClient = new QueryClient();

export function Providers({
  children,
  initialState,
}: Readonly<{
  children: React.ReactNode;
  initialState: State | undefined;
}>) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
