'use client';
import React from 'react';
import {Button, Spinner} from "flowbite-react";
import {updateAuctionTest} from "@/app/actions/auctionActions";

function AuthTest() {
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState<{status: number, message: string} | null>(null);
    
    function handleUpdate() {
        setResult(null);
        setLoading(true);
        updateAuctionTest().then(res => setResult(res))
            .catch(err => setResult(err))
            .finally(() => setLoading(false));
    }
    
    return (
        <div className={"flex items-center gap-4"}>
            <Button outline onClick={handleUpdate}>
                {loading && <Spinner size={"sm"} className={"me-3"} light />}
                Test authentication
            </Button>
            <div>
                {JSON.stringify(result, null, 2)}
            </div>
        </div>
    );
}

export default AuthTest;