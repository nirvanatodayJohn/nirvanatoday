"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react"
import { UserCircleIcon, LogoutCircle02Icon } from "@hugeicons/core-free-icons"
import { logoutAction } from "@/lib/actions/auth";

interface ProfileProps {
    user: {
        name?: string;
        email: string;
    };
}

export default function Profile({ user }: ProfileProps) {
    const handleLogout = async () => {
        await logoutAction();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-9 w-9 rounded-full border border-border hover:bg-muted transition-colors cursor-pointer">
                    <AvatarFallback className="rounded-full bg-background">
                        <HugeiconsIcon icon={UserCircleIcon} size={20} strokeWidth={1.5} className="text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-56 rounded-xl p-2 shadow-xl border-border bg-background/95 backdrop-blur-sm"
            >
                <DropdownMenuLabel className="p-2 font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">{user.name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="-mx-2 my-2" />
                <DropdownMenuGroup>
                    <Link href="/account" className="w-full">
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer focus:bg-muted rounded-lg">
                            <HugeiconsIcon icon={UserCircleIcon} size={16} strokeWidth={2} />
                            Account Profile
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="-mx-2 my-2" />
                <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="text-red-600 flex items-center gap-2 cursor-pointer focus:bg-red-50 focus:text-red-600 rounded-lg"
                >
                    <HugeiconsIcon icon={LogoutCircle02Icon} size={16} strokeWidth={2} className="text-red-600" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
