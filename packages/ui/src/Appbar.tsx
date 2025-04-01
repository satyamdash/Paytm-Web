import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    } | null;
    onSignIn: () => void;
    onSignOut: () => void;
}

export const Appbar = ({ user, onSignIn, onSignOut }: AppbarProps) => {
    return (
        <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PayTM
        </div>
        <div className="flex flex-col justify-center pt-2">
                <Button onClick={user ? onSignOut : onSignIn}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}