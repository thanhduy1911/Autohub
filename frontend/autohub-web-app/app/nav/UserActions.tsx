'use client';
import React from 'react';
import {Dropdown, DropdownDivider} from "flowbite-react";
import Link from "next/link";
import { User } from 'next-auth';
import {HiCog, HiUser} from "react-icons/hi2";
import {AiFillCar, AiFillTrophy, AiOutlineLogout} from "react-icons/ai";
import {DropdownItem} from "flowbite-react";
import { signOut } from 'next-auth/react';
import {useParamsStore} from "@/hooks/useParamsStore";
import {usePathname, useRouter} from 'next/navigation';

type Props = {
    user: User;
}

function UserActions({user}: Props) {
    const router = useRouter();
    const pathName = usePathname();
    const setParms = useParamsStore(state => state.setParms);
    
    function setWinner() {
        setParms({winner: user.username, seller: undefined});
        if (pathName !== '/') useRouter().push('/');
    }
    
    function setSeller() {
        setParms({seller: user.username, winner: undefined});
        if (pathName !== '/') useRouter().push('/');
    }
    
    return (
        <Dropdown inline label={`Welcome ${user.name}`} className={"cursor-pointer"}>
            <DropdownItem icon={HiUser} onClick={setSeller}>
                My Auctions
            </DropdownItem>
            <DropdownItem icon={AiFillTrophy} onClick={setWinner}>
                Auctions won
            </DropdownItem>
            <DropdownItem icon={AiFillCar}>
                <Link href={`/auctions/create`}>Sell my car</Link>
            </DropdownItem>
            <DropdownItem icon={HiCog}>
                <Link href={'/session'}>
                    Session (dev only!)
                </Link>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem icon={AiOutlineLogout} onClick={() => signOut({redirectTo: '/'})}>
                Sign out
            </DropdownItem>
        </Dropdown>
    );
}

export default UserActions;