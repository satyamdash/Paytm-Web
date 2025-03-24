"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";
export const getOnRampTransactions = async (amount: number, provider: string) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            error: "Unauthorized"
        }
    }
    if(!session.user.id) {
        return {
            error: "User not logged in"
        }
    }
    
    await prisma.onRampTransaction.create({
        data: {
            userId: Number(session.user.id),
            amount: amount,
            provider: provider,
            status: "Processing",
            token: crypto.randomUUID(),
            startTime: new Date()
        }
    })
    
}