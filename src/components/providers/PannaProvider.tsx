"use client";

import { PannaProvider as SDKPannaProvider } from "panna-sdk";

export function PannaProvider({ children }: { children: React.ReactNode }) {
  // Use fallback values during build time if env vars are not set
  const clientId = process.env.NEXT_PUBLIC_PANNA_CLIENT_ID || "placeholder-client-id";
  const partnerId = process.env.NEXT_PUBLIC_PANNA_PARTNER_ID || "placeholder-partner-id";

  return (
    <SDKPannaProvider clientId={clientId} partnerId={partnerId}>
      {children}
    </SDKPannaProvider>
  );
}
