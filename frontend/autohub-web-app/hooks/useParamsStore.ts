import {create} from "zustand/react";
import {Auction} from "@/types";

type State = {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    searchTerm: string;
    orderBy: string;
    filterBy: string;
}

type Action = {
    setParms: (parms: Partial<State>) => void;
    reset: () => void;
}

const initialState: State = {
    pageNumber: 1,
    pageSize: 12,
    pageCount: 1,
    searchTerm: "",
    orderBy: "make",
    filterBy: "live",
}

export const useParamsStore = create<State & Action>((set) => ({
    ...initialState,
    setParms: (newParams: Partial<State>) => {
        set((state) => {
            if (newParams.pageNumber) {
                return {...state, pageNumber: newParams.pageNumber}
            } else {
                return {...state, ...newParams, pageNumber: 1}
            }
        })
    },
    
    reset: () => set(initialState)
}))