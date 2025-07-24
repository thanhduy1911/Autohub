'use server';

import {Auction, PagesResult} from "@/types";

export async function getData(query: string) : Promise<PagesResult<Auction>> {
    const res = await fetch(`http://localhost:6001/search${query}`);

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json();
}