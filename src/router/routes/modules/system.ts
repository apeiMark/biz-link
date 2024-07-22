import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const SYSTEM: AppRouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.system',
    requiresAuth: true,
    icon: 'icon-list',
    order: 1,
  },
  children: [
    {
      path: 'account-audit', // The midline path complies with SEO specifications
      name: 'AccountAudit',
      component: () => import('@/views/system/account-audit/index.vue'),
      meta: {
        locale: 'menu.system.accountAudit',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //   path: 'card',
    //   name: 'SystemCard',
    //   component: () => import('@/views/system/card/index.vue'),
    //   meta: {
    //     locale: 'menu.system.cardList',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
}

export default SYSTEM
