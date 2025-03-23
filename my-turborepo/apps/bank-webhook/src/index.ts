import express from "express";
import db from "@repo/db";
const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    try
    {
        await db.$transaction(async (tx) => {
        tx.balance.updateMany({
            where: {
                userId: Number(paymentInformation.userId)
            },
            data: {
                amount: { increment: Number(paymentInformation.amount) }
            }
        }),
        tx.onRampTransaction.updateMany({
            where: {
                token: paymentInformation.token
            }, 
            data: {
                status: "Success",
            }
        })
        })
        res.status(200).send("Success");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
