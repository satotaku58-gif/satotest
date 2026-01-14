'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PageContextType {
    currentPage: string;
    previousPage: string | null;
    setPage: (page: string) => void;
    getPage: () => string | null;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
    const [currentPage, setCurrentPage] = useState<string>('');
    const [previousPage, setPreviousPage] = useState<string | null>(null);

    const setPage = (page: string) => {
        setPreviousPage(currentPage || null);
        setCurrentPage(page);
    };

    const getPage = () => {
        return currentPage || null;
    };

    const value: PageContextType = {
        currentPage,
        previousPage,
        setPage,
        getPage,
    };

    return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = () => {
    const context = useContext(PageContext);
    if (context === undefined) {
        throw new Error('usePageContext must be used within a PageProvider');
    }
    return context;
};
