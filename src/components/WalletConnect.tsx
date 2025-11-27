"use client";

import { useActiveAccount, useLogin, useLogout } from "panna-sdk/react";
import { ecosystem } from "@/lib/panna-config";
import { motion } from "framer-motion";
import { useState } from "react";

export function WalletConnect() {
  const account = useActiveAccount();
  const { connect, isLoading } = useLogin();
  const { logout } = useLogout();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<"email" | "verify" | "connected">("email");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await connect({
        client: undefined as any, // Will use context
        ecosystem,
        strategy: "email",
        email,
      });
      setStep("verify");
    } catch (error) {
      console.error("Email submission failed:", error);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) return;

    try {
      const result = await connect({
        client: undefined as any,
        ecosystem,
        strategy: "email",
        email,
        verificationCode,
      });

      if (result) {
        setStep("connected");
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setStep("email");
    setEmail("");
    setVerificationCode("");
  };

  if (account) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="px-4 py-2 bg-black/5 rounded-lg">
          <p className="text-sm font-medium text-black/60">
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-black text-white rounded-lg font-medium text-sm hover:bg-black/90 transition-colors"
        >
          Disconnect
        </button>
      </motion.div>
    );
  }

  if (step === "verify") {
    return (
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleVerifySubmit}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Enter verification code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="px-4 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30"
        />
        <button
          type="submit"
          disabled={isLoading || !verificationCode}
          className="px-4 py-2 bg-black text-white rounded-lg font-medium text-sm hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </motion.form>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleEmailSubmit}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30"
      />
      <button
        type="submit"
        disabled={isLoading || !email}
        className="px-4 py-2 bg-black text-white rounded-lg font-medium text-sm hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Connecting..." : "Connect Wallet"}
      </button>
    </motion.form>
  );
}
