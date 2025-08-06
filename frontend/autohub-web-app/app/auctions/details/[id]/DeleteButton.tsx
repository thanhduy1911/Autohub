'use client';

import { deleteAuction } from '@/app/actions/auctionActions';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import {Button, Spinner} from "flowbite-react";

type Props = {
    id: string;
}

function DeleteButton({id}: Props) {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    
    function handleDelete() {
        setLoading(true);
        
        deleteAuction(id)
            .then(res => {
                if (res.error) throw res.error;
                router.push('/');
            })
            .catch(e => {
                toast.error(e.status + " " + e.message);
            })
            .finally(() => setLoading(false));
    }
    
    return (
        <Button outline color={"red"} onClick={handleDelete}>
            {loading && <Spinner size={"sm"} className={"mr-3"}/>}
            Delete Auction
        </Button>
    );
}

export default DeleteButton;