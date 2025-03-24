import { BalanceCard } from "../../../components/BalanceCard";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
export default function TransferPage() {
    return (
        <div>
            <BalanceCard />
            <AddMoneyCard />
            <OnRampTransaction />
        </div>
    )
}