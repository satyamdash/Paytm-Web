"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db";

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

    const toUser = await db.user.findUnique({
        where: {
            number: number.toString()
        }
    })
    if(!toUser) {
        return {
            message: "User is not available on our platform"
        }
    }

    await db.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`;

        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(session.user.id) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(session.user.id) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });

          await tx.p2pTransfer.create({
            data: {
                fromUserId: Number(session.user.id),
                toUserId: Number(toUser.id),
                amount,
                timestamp: new Date()
            }
          })
    });
    return {
        message: "Money sent successfully"
    }
}