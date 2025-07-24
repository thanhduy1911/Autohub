'use client';

import React, {ChangeEvent, useEffect, useState} from 'react';
import {FaSearch} from "react-icons/fa";
import {useParamsStore} from "@/hooks/useParamsStore";

function Search() {
    const setParams = useParamsStore(state => state.setParms);
    const searchTerm = useParamsStore(state => state.searchTerm);
    const [value, setValue] = useState('');
    
    useEffect(() => {
        if (searchTerm === '') setValue('');
    },[searchTerm]);
    
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }
    
    function handleSearch() {
        setParams({searchTerm: value});
    }
    
    return (
        <div className='flex w-[50%] items-center justify-between border-2 rounded-full py-2 shadow-sm'>
            <input
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
                onChange={handleChange}
                value={value}
                type="text"
                placeholder='Search for cars by make, model or color'
                className='
                flex-grow
                pl-5
                bg-transparent
                focus:outline-none
                focus:border-transparent
                focus:ring-0
                text-sm
                text-gray-600
                '
            />
            <button>
                <FaSearch size={34}
                          className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2'
                          onClick={handleSearch}
                />
            </button>
        </div>
    );
}

export default Search;