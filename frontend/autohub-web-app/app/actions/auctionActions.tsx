'use server';

import {Auction, PagesResult} from "@/types";
import {fetchWrapper} from "@/lib/fetchWrapper";
import {FieldValues} from "react-hook-form";

export async function getData(query: string) : Promise<PagesResult<Auction>> {
    return fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest(): Promise<{status: number, message: string}> {
    const data = {
        mileage: Math.floor(Math.random() * 1000) + 1,
    }
    
    return fetchWrapper.put('auctions/6a5011a1-fe1f-47df-9a32-b5346b289391', data);
}

export async function createAuction(data: FieldValues) {
    return fetchWrapper.post(`auctions`, data);
}

export async function getDetailedViewData(id: string) : Promise<Auction> {
    return fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
    return fetchWrapper.put(`auctions/${id}`, data);
}

export async function deleteAuction(id: string) {
    return fetchWrapper.del(`auctions/${id}`);
}