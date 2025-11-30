"use client";

import { useTokenBalance } from './useTokenBalance';
import { CONTRACT_ADDRESSES, STOCKS } from '@/lib/contracts';

export function usePortfolio() {
    const idrxBalance = useTokenBalance(CONTRACT_ADDRESSES.IDRX);
    const aaplBalance = useTokenBalance(CONTRACT_ADDRESSES.AAPL);
    const nvdaBalance = useTokenBalance(CONTRACT_ADDRESSES.NVDA);
    const googlBalance = useTokenBalance(CONTRACT_ADDRESSES.GOOGL);

    const isLoading =
        idrxBalance.isLoading ||
        aaplBalance.isLoading ||
        nvdaBalance.isLoading ||
        googlBalance.isLoading;

    // Calculate portfolio value in IDRX
    const calculatePortfolioValue = () => {
        try {
            const aaplValue = parseFloat(aaplBalance.formattedBalance) * STOCKS.AAPL.rate;
            const nvdaValue = parseFloat(nvdaBalance.formattedBalance) * STOCKS.NVDA.rate;
            const googlValue = parseFloat(googlBalance.formattedBalance) * STOCKS.GOOGL.rate;
            const idrxValue = parseFloat(idrxBalance.formattedBalance);

            const total = aaplValue + nvdaValue + googlValue + idrxValue;
            return total;
        } catch {
            return 0;
        }
    };

    const portfolioValue = calculatePortfolioValue();

    return {
        idrx: idrxBalance,
        stocks: {
            AAPL: aaplBalance,
            NVDA: nvdaBalance,
            GOOGL: googlBalance,
        },
        portfolioValue,
        isLoading,
        refetchAll: () => {
            idrxBalance.refetch();
            aaplBalance.refetch();
            nvdaBalance.refetch();
            googlBalance.refetch();
        },
    };
}
