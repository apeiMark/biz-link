import Mock from 'mockjs'

import './message-box'
import './user'

import '@/views/dashboard/workplace/mock'
/** simple */
import '@/views/dashboard/monitor/mock'

import '@/views/list/search-table/mock'

import '@/views/system/account-audit/mock'

import '@/views/file/file-list/mock'
import '@/views/file/library/mock'

import '@/views/form/step/mock'

import '@/views/profile/basic/mock'

import '@/views/visualization/data-analysis/mock'
import '@/views/visualization/multi-dimension-data-analysis/mock'

import '@/views/user/info/mock'
import '@/views/user/setting/mock'
/** simple end */

Mock.setup({
  timeout: '600-1000',
})
