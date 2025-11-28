// UI Constants
export const BUTTON_STYLES = {
    primary: "px-6 py-2.5 bg-black text-white rounded-full font-medium text-sm hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg",
    secondary: "px-6 md:px-8 py-3 md:py-4 border border-black/20 text-black text-base md:text-lg font-medium rounded-full hover:bg-black/5 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center backdrop-blur-sm tracking-wide",
    cta: "btn-glow px-6 md:px-8 py-3 md:py-4 bg-black text-white text-base md:text-lg font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-black/30 tracking-wide",
    glass: "px-6 py-2.5 bg-white/10 backdrop-blur-md border border-black/10 text-black font-medium rounded-full text-sm hover:bg-black/5 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md",
    classic: "px-4 py-1.5 !bg-white !border !border-solid !border-black !text-black font-medium rounded-full text-sm hover:!bg-black hover:!text-white transition-all hover:scale-105 active:scale-95 shadow-sm",
} as const;

// Animation Constants
export const ANIMATION = {
    durations: {
        fast: 0.3,
        normal: 0.5,
        slow: 0.8,
        pageLoader: 3000, // ms
    },
    easing: {
        bounce: [0.34, 1.56, 0.64, 1],
        smooth: [0.4, 0, 0.2, 1],
    },
    delays: {
        short: 0.1,
        medium: 0.2,
        long: 0.4,
    },
} as const;

// Scroll Constants
export const SCROLL = {
    backToTopThreshold: 300,
    fadeInMargin: "-50px",
} as const;

// Stock Ticker Data
export const STOCK_TICKER_DATA = [
    { symbol: "AAPL", price: "182.50", change: "+1.2%", up: true },
    { symbol: "TSLA", price: "240.10", change: "-0.5%", up: false },
    { symbol: "NVDA", price: "485.90", change: "+2.8%", up: true },
    { symbol: "MSFT", price: "370.20", change: "+0.9%", up: true },
    { symbol: "GOOGL", price: "138.40", change: "-0.2%", up: false },
    { symbol: "AMZN", price: "145.80", change: "+1.5%", up: true },
    { symbol: "COIN", price: "155.60", change: "+4.2%", up: true },
    { symbol: "MSTR", price: "590.00", change: "+5.1%", up: true },
] as const;

// Globe Constants
export const GLOBE = {
    arcCount: 10,
    autoRotateSpeed: 0.5,
    altitude: 1.8,
    minMaxDistance: 350,
    defaultHeight: 650,
} as const;

// Cursor Follower Constants
export const CURSOR = {
    dotStiffness: 500,
    dotDamping: 28,
    dotMass: 0.5,
    ringStiffness: 150,
    ringDamping: 20,
    ringMass: 0.8,
} as const;
