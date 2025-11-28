import { createPannaClient, liskSepolia, EcosystemId } from "panna-sdk";

// Environment variables with fallbacks for build time
const clientId = process.env.NEXT_PUBLIC_PANNA_CLIENT_ID || "";
const partnerId = process.env.NEXT_PUBLIC_PANNA_PARTNER_ID || "";

// Runtime validation (will log warnings instead of throwing)
if (typeof window !== "undefined") {
  if (!clientId) {
    console.warn("NEXT_PUBLIC_PANNA_CLIENT_ID is not defined in environment variables");
  }
  if (!partnerId) {
    console.warn("NEXT_PUBLIC_PANNA_PARTNER_ID is not defined in environment variables");
  }
}

// Create Panna client instance (will use placeholder if not set)
export const pannaClient = createPannaClient({
  clientId: clientId || "placeholder-client-id",
});

// Export ecosystem config
export const ecosystem = {
  id: EcosystemId.LISK,
  partnerId: partnerId || "placeholder-partner-id",
};

// Export chain configuration
export const defaultChain = liskSepolia;

// Export constants
export { clientId, partnerId };
