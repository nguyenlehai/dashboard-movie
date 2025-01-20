import { useState } from 'react';
import { Dropdown, Image, Layout, Menu, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  CloseOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { useThemeStore } from '@/stores/theme-store';
import { RouteConfig, routes } from '@/routes/config';
import { useMediaQuery } from '@/hooks/use-media-query';
import { DEVICE } from '@/utils/constants';
import { cn } from '@/utils/utils';
import './sidebar.css';
import LOGO from '@/components/media/images/logo.svg';

const { Sider } = Layout;

type MenuItemsType = NonNullable<MenuProps['items']>[number];
type MenuItems = NonNullable<MenuProps['items']>;

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { mode, setMode } = useThemeStore();
  const isMobile = useMediaQuery(DEVICE.IS_MOBILE);

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const getThemeIcon = () => {
    switch (mode) {
      case 'dark':
        return <MoonOutlined />;
      case 'system':
        return <LaptopOutlined />;
      default:
        return <SunOutlined />;
    }
  };

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
  };

  const ThemeMenu = () => (
    <Dropdown
      menu={{
        items: [
          {
            key: 'light',
            label: (
              <div className="flex items-center gap-2 group">
                <SunOutlined className="transition-transform duration-300 group-hover:rotate-180" />
                <span>Light Mode</span>
              </div>
            ),
            onClick: () => handleThemeChange('light'),
          },
          {
            key: 'dark',
            label: (
              <div className="flex items-center gap-2 group">
                <MoonOutlined className="transition-transform duration-300 group-hover:-rotate-12" />
                <span>Dark Mode</span>
              </div>
            ),
            onClick: () => handleThemeChange('dark'),
          },
        ],
      }}
      placement="bottomRight"
      trigger={['click']}
      overlayClassName="theme-dropdown"
    >
      <div className="flex items-center cursor-pointer">
        {getThemeIcon()}
        {collapsed && <span>Theme</span>}
        {(!collapsed || isMobile) && <span className="ml-3">Theme</span>}
      </div>
    </Dropdown>
  );

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'theme') return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (isMobile && onClose) {
      onClose();
    }
  };

  const convertRoutesToMenuItems = (routes: RouteConfig[]): MenuItems => {
    const convert = (route: RouteConfig): MenuItemsType => {
      const menuLabel = route.component ? (
        <Link
          to={route.path}
          className="relative group flex items-center w-full"
        >
          {route.label}
        </Link>
      ) : (
        <span>{route.label}</span>
      );

      const baseItem: MenuItemsType = {
        key: route.path,
        icon: route.icon && (
          <span className="group-hover:scale-110 transition-transform duration-300">
            {<route.icon />}
          </span>
        ),
        label: menuLabel,
        className: 'group',
      };

      if (route.children?.length) {
        return {
          ...baseItem,
          children: route.children
            .filter(child => child.showInMenu)
            .map(child => convert(child)),
        };
      }

      return baseItem;
    };

    return routes
      .filter(route => route.showInMenu)
      .map(route => convert(route));
  };

  const baseMenuItems = [
    ...convertRoutesToMenuItems(routes),
    {
      key: 'theme',
      label: <ThemeMenu />,
    },
  ];

  const menuItems = [...baseMenuItems];

  const getOpenKeys = (): string[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    return pathSegments.reduce<string[]>((acc, _, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const pathExists = (routes: RouteConfig[]): boolean => {
        return routes.some(
          route =>
            route.path === path ||
            (route.children && pathExists(route.children)),
        );
      };

      if (pathExists(routes)) {
        acc.push(path);
      }
      return acc;
    }, []);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white dark:bg-black">
      {isMobile && (
        <div className="h-14 flex justify-between items-center px-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <CloseOutlined className="text-lg" />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <Menu
          theme={mode === 'dark' ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={getOpenKeys()}
          items={menuItems}
          className={cn(
            'border-none',
            !collapsed && !isMobile && 'custom-sider',
          )}
          onClick={handleMenuClick}
        />
      </div>

      {!isMobile && (
        <div
          className={cn(
            'h-14 border-t border-gray-200/20 dark:border-gray-700/20',
            'flex items-center justify-center cursor-pointer',
            'transition-all duration-300 hover:bg-primary/5',
            'group',
          )}
          onClick={toggleCollapsed}
        >
          {collapsed ? (
            <MenuUnfoldOutlined className="text-lg transform group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
          ) : (
            <MenuFoldOutlined className="text-lg transform group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
          )}
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
            onClick={onClose}
          />
        )}

        <div
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-[280px] h-screen',
            'transform transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            mode === 'dark' ? 'bg-gray-800' : 'bg-white',
          )}
        >
          <div className="flex flex-col h-full">{sidebarContent}</div>
        </div>
      </>
    );
  }

  const getSystemTheme = () => {
    if (mode !== 'system') return mode;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={cn(
        'h-screen overflow-hidden relative',
        'before:absolute before:inset-0 before:z-0',
        !collapsed && 'sidebar',
        getSystemTheme() === 'dark'
          ? 'before:bg-[linear-gradient(rgb(17,24,39)_40%,rgb(55,65,81)_80%,rgb(75,85,99)_100%)]'
          : 'before:bg-[linear-gradient(rgb(217,233,255)_40%,rgb(255,230,217)_80%,rgb(255,217,217)_100%)]',
      )}
      theme={getSystemTheme() === 'dark' ? 'dark' : 'light'}
      width={220}
    >
      <div className="relative z-10 h-full flex flex-col">
        <div
          className={cn(
            'px-6 py-6',
            'border-b border-gray-200/20 dark:border-gray-700/20',
          )}
        >
          {!collapsed ? (
            <div
              className={cn(
                'object-contain transition-all duration-300',
                collapsed ? 'w-8 h-8' : 'w-32 h-8',
              )}
            >
              <Image src={LOGO} alt="Glance Care Admin" />
            </div>
          ) : (
            <Image src="public/apple-touch-icon.png" alt="Glance Care Admin" />
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <Menu
            theme={mode === 'dark' ? 'dark' : 'light'}
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={getOpenKeys()}
            items={menuItems}
            className={cn(
              'border-none bg-transparent',
              !collapsed && !isMobile && 'custom-sider',
            )}
            onClick={handleMenuClick}
          />
        </div>

        <div
          className={cn(
            'h-14 border-t border-gray-200/20 dark:border-gray-700/20',
            'flex items-center justify-center cursor-pointer',
            'transition-colors duration-200',
            mode === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/50',
          )}
          onClick={toggleCollapsed}
        >
          {collapsed ? (
            <MenuUnfoldOutlined className="text-lg" />
          ) : (
            <MenuFoldOutlined className="text-lg" />
          )}
        </div>
      </div>
    </Sider>
  );
};
