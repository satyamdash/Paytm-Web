import { PrismaClient } from "@repo/db";

import dotenv from "dotenv";
dotenv.config({ path: "../../packages/db/.env" });

const prisma = new PrismaClient();

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Hello Tailwind!
      </h1>
    </div>
  );
}
