import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/conference',
  name: 'conference',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.conference',
    requiresAuth: true,
    icon: 'icon-video-camera',
    order: 2,
  },
  children: [
    {
      path: 'monitor',
      name: 'Monitor',
      component: () => import('@/views/conference/monitor/index.vue'),
      meta: {
        locale: 'menu.conference.monitor',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}

export default DASHBOARD
