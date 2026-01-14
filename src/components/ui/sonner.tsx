import type { CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useApp } from "../../contexts/AppContext";

export const Toaster = (props: ToasterProps) => {
  const { mode } = useApp();

  return (
    <Sonner
      theme={mode.dark ? "dark" : "light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as CSSProperties
      }
      {...props}
    />
  );
};
