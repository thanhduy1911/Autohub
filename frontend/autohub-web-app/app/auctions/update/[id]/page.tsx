import React from 'react';
import {getDetailedViewData} from "@/app/actions/auctionActions";
import Heading from '@/app/components/Heading';
import AuctionForm from "@/app/auctions/AuctionForm";

async function Update({params} : {params: Promise<{id: string}>}) {
    const {id} = await params;
    const data = await getDetailedViewData(id);
    return (
        <div className={"mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg"}>
            <Heading title={"Update Your Auction"} subtitle={"Please update the details for your " +
                "car (only these auction properties can be updated)"}/>
            <AuctionForm auction={data} />
        </div>
    );
}

export default Update;