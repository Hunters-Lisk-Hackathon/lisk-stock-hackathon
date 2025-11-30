import { http, createConfig } from 'wagmi';
import { liskSepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// Configure Lisk Sepolia chain
export const config = createConfig({
    chains: [liskSepolia],
    connectors: [
        injected(), // MetaMask, etc.
    ],
    transports: {
        [liskSepolia.id]: http(),
    },
});
