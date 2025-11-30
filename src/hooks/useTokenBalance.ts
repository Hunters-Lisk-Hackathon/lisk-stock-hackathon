"use client";

import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { ERC20_ABI } from '@/lib/contracts';

export function useTokenBalance(tokenAddress: `0x${string}` | undefined) {
    const { address } = useAccount();

    const { data: balance, isLoading, refetch } = useReadContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && !!tokenAddress,
        },
    });

    // Format balance with 18 decimals
    const formattedBalance = balance ? formatUnits(balance as bigint, 18) : '0';

    return {
        balance: balance as bigint | undefined,
        formattedBalance,
        isLoading,
        refetch,
    };
}
