
import "./globals.css";
import React from "react";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
import { ThemeProvider } from "./ThemeProvider";
import { Themeswitcher } from "./Themeswitcher";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
          <StackProvider app={stackServerApp}>
            <StackTheme>
              
              {/* 🌗 Theme Toggle Buttons */}
              {/* <Themeswitcher /> */}
              
              {/* Your app content */}
              {children}
              <Toaster/>
            </StackTheme>
          </StackProvider>
        
      </body>
    </html>
  );
}
