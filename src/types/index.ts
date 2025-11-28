// Stock Ticker Types
export interface Stock {
    symbol: string;
    price: string;
    change: string;
    up: boolean;
}

// Scroll Stepper Types
export interface ScrollStep {
    title: string;
    description: string;
}

// Animation Types
export type FadeDirection = "up" | "down" | "left" | "right";

export interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: FadeDirection;
    scale?: number;
}

// Spotlight Card Types
export interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
}

// Utility Types
export type ButtonVariant = "primary" | "secondary" | "cta";
