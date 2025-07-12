"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import { Amplify } from "aws-amplify";
import config from "../amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react"; // Import Authenticator
import "@aws-amplify/ui-react/styles.css"; // Import default styles

Amplify.configure(config);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Authenticator.Provider>
      {/* Wrap with Authenticator.Provider */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Authenticator.Provider>
  );
}
