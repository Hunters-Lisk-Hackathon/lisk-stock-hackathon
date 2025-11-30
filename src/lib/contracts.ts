// Contract addresses deployed on Lisk Sepolia
export const CONTRACT_ADDRESSES = {
  IDRX: '0x35b674824F211e1b25CbBc4087C734B3E285d54E',
  AAPL: '0xcf54B13ed8db8307f0Fb54eEde6533C3121BDf29',
  NVDA: '0xC907F2BE7A208eebf8cF1cF570a514b3F715a7a1',
  GOOGL: '0x703D9B1652ee9562CE0575f38E7E6bEAbf22A54e',
  ROUTER: '0xe82120f3f0C9f8b4F0C34d65EAA517F0e0e2edDe',
} as const;

// Exchange rates (IDRX per 1 stock token)
export const EXCHANGE_RATES = {
  AAPL: 200,
  NVDA: 140,
  GOOGL: 150,
} as const;

// Stock metadata
export const STOCKS = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc',
    address: CONTRACT_ADDRESSES.AAPL,
    rate: EXCHANGE_RATES.AAPL,
    color: 'bg-black',
  },
  NVDA: {
    symbol: 'NVDA',
    name: 'Nvidia Corp',
    address: CONTRACT_ADDRESSES.NVDA,
    rate: EXCHANGE_RATES.NVDA,
    color: 'bg-green-500',
  },
  GOOGL: {
    symbol: 'GOOGL',
    name: 'Google',
    address: CONTRACT_ADDRESSES.GOOGL,
    rate: EXCHANGE_RATES.GOOGL,
    color: 'bg-blue-500',
  },
} as const;

// ERC20 ABI (standard functions we need)
export const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// SimpleSwapRouter ABI
export const ROUTER_ABI = [
  {
    inputs: [
      { name: 'stockToken', type: 'address' },
      { name: 'idrxAmount', type: 'uint256' },
    ],
    name: 'swapIDRXForStock',
    outputs: [{ name: 'stockAmount', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'stockToken', type: 'address' }],
    name: 'getRate',
    outputs: [{ name: 'rate', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'stockToken', type: 'address' },
      { name: 'idrxAmount', type: 'uint256' },
    ],
    name: 'calculateSwapOutput',
    outputs: [{ name: 'stockAmount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
