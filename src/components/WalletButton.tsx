"use client";

import Link from "next/link";
import { BUTTON_STYLES } from "@/lib/constants";

export function WalletButton() {
  return (
    <Link href="/dashboard" className={BUTTON_STYLES.classic}>
      Launch App
    </Link>
  );
}
