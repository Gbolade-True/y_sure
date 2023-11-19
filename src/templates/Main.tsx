import { CSSProperties, ReactNode } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { AppHeader } from '@/components/Navigation/Header';
import { useThemeContext } from '@/contexts/Theme';
import cn from 'classnames';

const { Content, Footer } = Layout;

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Main = ({ className, meta, children }: IMainProps) => {
  const { darkTheme } = useThemeContext();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Lato', sans-serif",
          fontSize: 12,
        },
        algorithm: darkTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {meta}
      <Layout className="min-h-screen" style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Content className={cn(className)}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>Y-SURE ©2023</Footer>
      </Layout>
    </ConfigProvider>
  );
};

export { Main };
