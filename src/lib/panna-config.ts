import { createPannaClient, liskSepolia, EcosystemId } from "panna-sdk";

// Environment variables
const clientId = process.env.NEXT_PUBLIC_PANNA_CLIENT_ID!;
const partnerId = process.env.NEXT_PUBLIC_PANNA_PARTNER_ID!;

if (!clientId) {
  throw new Error(
    "NEXT_PUBLIC_PANNA_CLIENT_ID is not defined in environment variables",
  );
}

if (!partnerId) {
  throw new Error(
    "NEXT_PUBLIC_PANNA_PARTNER_ID is not defined in environment variables",
  );
}

// Create Panna client instance
export const pannaClient = createPannaClient({
  clientId,
});

// Export ecosystem config
export const ecosystem = {
  id: EcosystemId.LISK,
  partnerId,
};

// Export chain configuration
export const defaultChain = liskSepolia;

// Export constants
export { clientId, partnerId };
