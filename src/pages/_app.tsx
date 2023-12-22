import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import ThemeProvider from '@/contexts/Theme';
import '../styles/global.css';
import 'antd/dist/reset.css';
import { useRouter } from 'next/router';
import LoadingPage from '@/components/Loading';
import { AuthProvider } from '@/contexts/Auth';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <ThemeProvider>
      <AuthProvider>{loading ? <LoadingPage /> : <Component {...pageProps} />}</AuthProvider>
    </ThemeProvider>
  );
};

export default MyApp;
