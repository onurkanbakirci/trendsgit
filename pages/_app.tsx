import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '@/components/layout';
import { RepoProvider } from '../context/RepoContext';
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({
  Component,
  pageProps: { ...pageProps }
}: AppProps) {
  return (
    <RepoProvider { ...pageProps }>
      <Layout {...pageProps}>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </RepoProvider>
  );
}