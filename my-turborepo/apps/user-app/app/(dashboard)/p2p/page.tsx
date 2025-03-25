"use client"
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { sendMoney } from "../../lib/actions/sendMoney";

export default function P2P() {
    const [number, setNumber] = useState(0);
    const [amount, setAmount] = useState(0);
    return (
        <div className="flex justify-center flex-col h-full">
            <Center>
                <Card title=" Send">
                    <div className="w-full">
                        <TextInput label={"Number"} placeholder={"Number"} onChange={(value) => {
                            setNumber(Number(value));
                        }} />
                        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                            setAmount(Number(value));
                        }} />
                        <div className="flex justify-center pt-4">
                            <Button onClick={async () => {
                                console.log("Sending money");
                                await sendMoney(number, amount)
                            }}>
                            Send
                            </Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}           