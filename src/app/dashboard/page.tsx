import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4">
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <p className="text-lg text-black/60 mb-8">Coming Soon...</p>
            <Link
                href="/"
                className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
                Back to Home
            </Link>
        </div>
    );
}
