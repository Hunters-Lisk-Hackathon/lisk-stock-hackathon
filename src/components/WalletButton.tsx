"use client";

import { useActiveAccount } from "panna-sdk";
import { LoginButton } from "panna-sdk";
import { BUTTON_STYLES } from "@/lib/constants";
import { formatAddress } from "@/lib/utils";

export function WalletButton() {
  const account = useActiveAccount();

  if (account) {
    return (
      <button className={BUTTON_STYLES.primary}>
        {formatAddress(account.address)}
      </button>
    );
  }

  return (
    <LoginButton
      connectButton={{
        label: "Connect Wallet",
        className: BUTTON_STYLES.primary,
      }}
    />
  );
}
