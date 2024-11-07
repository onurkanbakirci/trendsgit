import React, { createContext, useContext, useState } from 'react';

interface RepoContextType {
    repos: any[];
    setRepos: (repos: any[]) => void;
}

const RepoContext = createContext<RepoContextType | undefined>(undefined);

export const RepoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [repos, setRepos] = useState<any[]>([]);

    return (
        <RepoContext.Provider value={{ repos, setRepos }}>
            {children}
        </RepoContext.Provider>
    );
};

export const useRepoContext = () => {
    const context = useContext(RepoContext);
    if (!context) {
        throw new Error('useRepoContext must be used within a RepoProvider');
    }
    return context;
};