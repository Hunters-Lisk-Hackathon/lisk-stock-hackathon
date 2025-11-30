"use client";

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseUnits } from 'viem';
import { CONTRACT_ADDRESSES, ERC20_ABI, ROUTER_ABI } from '@/lib/contracts';

export function useSwap() {
    const { address } = useAccount();
    const [status, setStatus] = useState<'idle' | 'approving' | 'swapping' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const { writeContract, data: hash } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    // Check allowance
    const checkAllowance = async (amount: bigint) => {
        if (!address) return false;

        try {
            const { data } = await useReadContract({
                address: CONTRACT_ADDRESSES.IDRX,
                abi: ERC20_ABI,
                functionName: 'allowance',
                args: [address, CONTRACT_ADDRESSES.ROUTER],
            });

            return (data as bigint) >= amount;
        } catch {
            return false;
        }
    };

    const approve = async (amount: string) => {
        try {
            setStatus('approving');
            setError(null);

            const amountWei = parseUnits(amount, 18);

            writeContract({
                address: CONTRACT_ADDRESSES.IDRX,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [CONTRACT_ADDRESSES.ROUTER, amountWei],
            });
        } catch (err: any) {
            setStatus('error');
            setError(err.message || 'Approval failed');
        }
    };

    const swap = async (stockAddress: `0x${string}`, idrxAmount: string) => {
        try {
            setStatus('swapping');
            setError(null);

            const amountWei = parseUnits(idrxAmount, 18);

            writeContract({
                address: CONTRACT_ADDRESSES.ROUTER,
                abi: ROUTER_ABI,
                functionName: 'swapIDRXForStock',
                args: [stockAddress, amountWei],
            });

            setStatus('success');
        } catch (err: any) {
            setStatus('error');
            setError(err.message || 'Swap failed');
        }
    };

    return {
        approve,
        swap,
        status,
        error,
        hash,
        isConfirming,
        isConfirmed,
        checkAllowance,
    };
}
