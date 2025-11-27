"use client";

import { PannaProvider as SDKPannaProvider } from "panna-sdk";

export function PannaProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_PANNA_CLIENT_ID!;
  const partnerId = process.env.NEXT_PUBLIC_PANNA_PARTNER_ID!;

  return (
    <SDKPannaProvider clientId={clientId} partnerId={partnerId}>
      {children}
    </SDKPannaProvider>
  );
}
