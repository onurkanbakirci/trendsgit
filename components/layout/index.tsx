import { useState, ReactNode } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Directory from './directory';
import Toast from '@/components/layout/toast';
import { useRouter } from 'next/router';
import { LoadingDots } from '@/components/icons';
import { useRepoContext } from 'context/RepoContext';

export default function Layout({
  children
}: {
  children: ReactNode;
}) {
  const { repos } = useRepoContext();
  
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (router.isFallback) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <LoadingDots color="white" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto h-screen flex overflow-hidden bg-black">
      <Toast username={"username"} />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        repos={repos}
      />

      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            <Navbar setSidebarOpen={setSidebarOpen} />
            {children}
          </main>
          <div className="hidden md:order-first h-screen md:flex md:flex-col">
            <Directory repos={repos} />
          </div>
        </div>
      </div>
    </div>
  );
}
