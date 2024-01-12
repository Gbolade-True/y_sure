// AuthContext.tsx
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
// import useSWR from 'swr';
// import LoadingPage from '@/components/Loading';
// import { ClientResponse } from '@/pages/api/_server/utils/constants';
import { Result } from 'antd';

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<{
  authenticated: boolean;
}>({
  authenticated: false,
});

export const useAuthContext = () => useContext(AuthContext);
const ALEX_BYPASS = 'alex_bypass';

export const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(false);
  // TDisabled for Alex's tests
  // const fetcher = (url: string) => fetch(url).then(res => res.json());
  // const { data: userIP, isLoading } = useSWR<ClientResponse<string>>(`/api/check_ip`, fetcher);

  useEffect(() => {
    // if (!userIP && !isLoading) setAuthenticated(false);
    // Check the IP addresses in your environment
    const allowedIPs = [ALEX_BYPASS];

    if (!allowedIPs.includes(ALEX_BYPASS)) {
      setAuthenticated(false);
      return;
    }

    setAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated }}>
      {/* {isLoading && <LoadingPage />} */}
      {authenticated ? children : <Result status="403" title="401" subTitle="Unauthorized: Access - Denied" />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
