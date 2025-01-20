import { BrowserRouter } from 'react-router-dom';
import { App as AntApp, ConfigProvider, theme as antTheme } from 'antd';
import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/layout';
import { useThemeStore } from '@/stores/theme-store';
import { AppRoutes } from '@/routes/app-routes';

const App = () => {
  const { mode, primaryColor } = useThemeStore();
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const currentTheme = mode === 'system' ? systemTheme : mode;

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === 'dark'
            ? antTheme.darkAlgorithm
            : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
          borderRadius: 6,
        },
      }}
    >
      <AntApp>
        <div className={`${currentTheme === 'dark' ? 'dark' : ''} h-screen`}>
          <BrowserRouter>
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </BrowserRouter>
        </div>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
