"use client";

import { useActiveAccount } from "panna-sdk";
import { LoginButton } from "panna-sdk";
import { useState } from "react";

export function WalletButton() {
  const account = useActiveAccount();

  if (account) {
    return (
      <button className="px-6 py-2.5 bg-black text-white rounded-lg font-medium text-sm hover:bg-black/90 transition-colors">
        {account.address.slice(0, 6)}...{account.address.slice(-4)}
      </button>
    );
  }

  return (
    <LoginButton
      connectButton={{
        label: "Connect Wallet",
        className:
          "px-6 py-2.5 bg-black text-white rounded-lg font-medium text-sm hover:bg-black/90 transition-colors",
      }}
    />
  );
}
