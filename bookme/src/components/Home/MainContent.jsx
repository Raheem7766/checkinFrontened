import React, { useEffect, useState } from 'react'
import BusSearchForm from './Search'
import Footer from './Footer'
import Center from './Center'
import SearchData from './SearchData';
import { useBusSearch } from '../context/context';

export default function MainContent() {
    const {
        searchData,
        filteredBusData,
        isSummaryVisible,
    } = useBusSearch();

    return (
        <div>
            <BusSearchForm />
            <div className='w-[100%] h-auto p-[1px]'>
                {isSummaryVisible && searchData ? (
                    <SearchData busData={filteredBusData}
                        searchParams={searchData} />
                ) : (               
                    <Center />
                )}
                <Footer />
            </div>
        </div>
    )
}
