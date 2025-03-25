"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";

export const sendMoney = async (number: number, amount: number) => {

    console.log("Sending money", number, amount);    
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
    const userBalance = await prisma.balance.findUnique({
        where: {
            userId: Number(session.user.id)
        },
        select: {
            amount: true
        }
    });

    if(userBalance?.amount && userBalance.amount < amount) {
        return {
            message: "Insufficient balance"
        }
    }
    
    await prisma.balance.update({
        where: {
        userId: Number(session.user.id)
    },
    data: {
        amount: {
            decrement: amount
        }
        }
    })

    return {
        message: "Money sent successfully"
    }

}