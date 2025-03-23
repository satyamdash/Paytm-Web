"use client"
import { useBalance } from "@repo/store/useBalance";
import db from "@repo/db";

export default function Home() {
  const balance = useBalance();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Hello Tailwind!
      </h1>
      <p>Balance: {balance}</p>
    </div>
  );
}
