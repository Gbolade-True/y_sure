import { AppProps } from 'next/app';
import ThemeProvider from '@/contexts/Theme';
import '../styles/global.css';
import 'antd/dist/reset.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
};

export default MyApp;
