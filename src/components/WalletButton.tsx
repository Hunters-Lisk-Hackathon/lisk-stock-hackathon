"use client";

import Link from "next/link";
import { BUTTON_STYLES } from "@/lib/constants";

export function WalletButton() {
  return (
    <Link href="/dashboard" className="px-6 py-2 bg-black text-white rounded-full font-medium text-sm hover:bg-black/80 transition-colors">
      Launch App
    </Link>
  );
}
