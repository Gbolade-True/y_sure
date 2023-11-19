import { Space, Spin } from 'antd';
import React from 'react';

const LoadingPage = () => {
  return (
    <Space className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </Space>
  );
};

export default LoadingPage;
