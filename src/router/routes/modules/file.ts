import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const LIST: AppRouteRecordRaw = {
  path: '/file',
  name: 'file',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.file',
    requiresAuth: true,
    icon: 'icon-cloud',
    order: 3,
  },
  children: [
    {
      path: 'library',
      name: 'Library',
      component: () => import('@/views/file/library/index.vue'),
      meta: {
        locale: 'menu.file.library',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'file-list', // The midline path complies with SEO specifications
      name: 'FileList',
      component: () => import('@/views/file/file-list/index.vue'),
      meta: {
        locale: 'menu.file.fileList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}

export default LIST
