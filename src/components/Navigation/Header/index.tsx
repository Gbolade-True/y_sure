import { useThemeContext } from '@/contexts/Theme';
import { useIsMobileMode } from '@/hooks/useWindowSize';
import { Layout, Menu, Switch, Typography } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header } = Layout;

export const AppHeader = () => {
  const { darkTheme, toggleDarkTheme } = useThemeContext();
  const pathname = usePathname();
  const isMobile = useIsMobileMode();

  const menuItems = [
    { key: 'home', title: 'Home', link: '/' },
    { key: 'nylon', title: 'Nylons', link: '/nylon' },
    { key: 'sale', title: 'Sales', link: '/sale' },
    { key: 'purchase', title: 'Purchases', link: '/purchase' },
  ];

  return (
    <Header className="sticky top-0 z-10 w-full flex items-center p-4 md:p-8">
      <Typography className="text-xl cursor-pointer whitespace-nowrap mr-4">
        <Link href="/">Y_SURE</Link>
      </Typography>
      <Menu
        mode="horizontal"
        theme="dark"
        items={menuItems.map(item => ({
          key: item.link,
          label: <Link href={item.link}>{item.title}</Link>,
        }))}
        defaultSelectedKeys={[pathname || '']}
        style={{ maxWidth: isMobile ? '200px' : '500px' }}
      />
      <Switch
        className="ml-4"
        checked={darkTheme}
        onChange={toggleDarkTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </Header>
  );
};
