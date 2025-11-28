"use client";

import { useActiveAccount } from "panna-sdk";
import { LoginButton } from "panna-sdk";
import { BUTTON_STYLES } from "@/lib/constants";
import { formatAddress } from "@/lib/utils";

export function WalletButton() {
  const account = useActiveAccount();

  if (account) {
    return (
      <button className={BUTTON_STYLES.classic}>
        <span className="relative z-10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {formatAddress(account.address)}
        </span>
      </button>
    );
  }

  return (
    <LoginButton
      connectButton={{
        label: "Connect Wallet",
        className: BUTTON_STYLES.classic,
        style: {
          backgroundColor: "#ffffff",
          border: "1px solid #000000",
          color: "#000000",
          borderRadius: "9999px",
          fontWeight: "500", // medium
          fontSize: "14px", // text-sm
          padding: "8px 16px", // restore padding
          height: "auto", // override default height
          minHeight: "unset", // ensure no min-height
        },
      }}
    />
  );
}
