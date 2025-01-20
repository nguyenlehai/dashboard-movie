import React, { Suspense, useState } from 'react';
import { Image, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useMediaQuery } from '@/hooks/use-media-query';
import { DEVICE } from '@/utils/constants';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/utils/utils';
import loadingData from '@/components/media/images/loading-data.gif';

const { Content } = Layout;

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isMobile = useMediaQuery(DEVICE.IS_MOBILE);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Layout className="h-screen">
      <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Layout>
        {isMobile && (
          <div className="sticky top-0 z-10 h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MenuOutlined className="text-lg" />
            </button>
          </div>
        )}

        <Content
          className={cn('overflow-auto h-full relative')}
          id="main-content"
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <Image preview={false} src={loadingData} />
              </div>
            }
          >
            {children}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};
