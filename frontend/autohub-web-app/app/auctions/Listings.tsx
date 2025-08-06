'use client';

import React, {useEffect, useState} from 'react';
import AuctionCard from './AuctionCard';
import AppPagination from "@/app/components/AppPagination";
import {getData} from "@/app/actions/auctionActions";
import {Auction, PagesResult} from "@/types";
import Filter from "@/app/auctions/Filter";
import {useParamsStore} from "@/hooks/useParamsStore";
import {useShallow} from "zustand/react/shallow";
import qs from "query-string";
import EmptyFilter from "@/app/components/EmptyFilter";

function Listings() {
    const [data, setData] = useState<PagesResult<Auction>>();
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner,
    })));
    const setParams = useParamsStore(state => state.setParms);
    const url = qs.stringifyUrl({url: '', query: params}, {skipEmptyString: true});
    
    function setPageNumber(pageNumber: number) {
        setParams({pageNumber});
    }
    
    useEffect(() => {
        getData(url).then(data => {
            setData(data);
        })
    }, [url]);
    
    if (!data) return <h3>Loading...</h3>
    
    return (
        <>
            <Filter/>
            {data.totalCount === 0 ? (
                <EmptyFilter showReset={true} />
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-6">
                        {data && data.results.map(auction => (
                            <AuctionCard key={auction.id} auction={auction} />
                        ))}
                    </div>
                    <div className={"flex justify-center mt-4"}>
                        <AppPagination pageChanged={setPageNumber}
                                       currentPage={params.pageNumber} pageCount={data.pageCount > 1 ? data.pageCount : 1} />
                    </div>
                </>
            )}
        </>
    );
}

export default Listings;