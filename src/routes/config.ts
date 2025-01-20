import { DashboardOutlined } from '@ant-design/icons';
import type { ComponentType } from 'react';
import React, { lazy } from 'react';
import type { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

const Dashboard = lazy(() => import('@/pages/dashboard/index'));

export interface RouteConfig {
  path: string;
  component?: React.LazyExoticComponent<ComponentType>;
  icon?: ComponentType<AntdIconProps>;
  label: string;
  children?: RouteConfig[];
  showInMenu?: boolean;
  isPrivate?: boolean;
  layout?: string;
}

export const routes: RouteConfig[] = [
  {
    path: '/dashboard',
    component: Dashboard,
    icon: DashboardOutlined,
    label: 'Dashboard',
    showInMenu: true,
    isPrivate: true,
    layout: 'dashboard',
  },
];
