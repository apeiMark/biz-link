import Mock from 'mockjs'

import './message-box'
import './user'

import '@/views/dashboard/workplace/mock'
/** simple */
import '@/views/dashboard/monitor/mock'

import '@/views/list/card/mock'
import '@/views/list/search-table/mock'

import '@/views/system/account-audit/mock'
import '@/views/system/card/mock'

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
