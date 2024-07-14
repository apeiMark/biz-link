<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.accountAudit']" />
    <a-card class="general-card" :title="$t('menu.system.accountAudit')">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="uid" :label="$t('accountAudit.form.uid')">
                  <a-input v-model="formModel.uid" :placeholder="$t('accountAudit.form.uid.placeholder')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="identityType" :label="$t('accountAudit.form.identityType')">
                  <a-select
                    v-model="formModel.identityType"
                    :options="identityTypeOptions"
                    :placeholder="$t('accountAudit.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="identifier" :label="$t('accountAudit.form.identifier')">
                  <a-input v-model="formModel.identifier" :placeholder="$t('accountAudit.form.identifier.placeholder')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" :label="$t('accountAudit.form.status')">
                  <a-select v-model="formModel.status" :options="statusOptions" :placeholder="$t('accountAudit.form.selectDefault')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="createTime" :label="$t('accountAudit.form.createTime')">
                  <a-range-picker v-model="formModel.createTime" style="width: 100%" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('accountAudit.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('accountAudit.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('accountAudit.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
          <a-tooltip :content="$t('accountAudit.actions.refresh')">
            <div class="action-icon" @click="search"><icon-refresh size="18" /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('accountAudit.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption v-for="item in densityList" :key="item.value" :value="item.value" :class="{ active: item.value === size }">
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('accountAudit.actions.columnSetting')">
            <a-popover trigger="click" position="bl" @popup-visible-change="popupVisibleChange">
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div v-for="(item, index) in showColumns" :key="item.dataIndex" class="setting">
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox v-model="item.checked" @change="handleChange($event, item as TableColumnData, index)"></a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="cloneColumns as TableColumnData[]"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #contentType="{ record }">
          <a-space>
            <a-avatar v-if="record.contentType === 'img'" :size="16" shape="square">
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            <a-avatar v-else-if="record.contentType === 'horizontalVideo'" :size="16" shape="square">
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            <a-avatar v-else :size="16" shape="square">
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            {{ $t(`accountAudit.form.contentType.${record.contentType}`) }}
          </a-space>
        </template>
        <template #filterType="{ record }">
          {{ $t(`accountAudit.form.filterType.${record.filterType}`) }}
        </template>
        <template #status="{ record }">
          <span v-if="record.status === 'offline'" class="circle"></span>
          <span v-else class="circle pass"></span>
          {{ $t(`accountAudit.form.status.${record.status}`) }}
        </template>
        <template #operations="{ record }">
          <div class="button-container">
            <a-button v-permission="['admin']" class="accept" type="primary" size="small" @click="acceptAudit(record)">
              {{ $t('accountAudit.columns.operations.accept') }}
            </a-button>
            <a-popconfirm content="你确定要驳回该账号的审核吗?" okText="确定" cancelText="取消" type="warning" @ok="rejectAudit(record)">
              <a-button class="reject" v-permission="['admin']" size="small">
                {{ $t('accountAudit.columns.operations.reject') }}
              </a-button>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { AcceptAudit, AuditAccountPageList, HttpResponse, RejectAudit, UserAuth, UserAuthParams } from '@/api/accountAudit'
import useLoading from '@/hooks/loading'
import { Pagination } from '@/types/global'
import { Message } from '@arco-design/web-vue'
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface'
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'
import cloneDeep from 'lodash/cloneDeep'
import Sortable from 'sortablejs'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'


type SizeProps = 'mini' | 'small' | 'medium' | 'large'
type Column = TableColumnData & { checked?: true }

const generateFormModel = () => {
  return {
    uid: '',
    identityType: '',
    identifier: '',
    status: '',
    createTime: [],
  }
}

const { loading, setLoading } = useLoading(true)
const { t } = useI18n()
const renderData = ref<UserAuth[]>([])
const formModel = ref(generateFormModel())
const cloneColumns = ref<Column[]>([])
const showColumns = ref<Column[]>([])

const size = ref<SizeProps>('medium')

const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}
const pagination = reactive({
  ...basePagination,
})
const densityList = computed(() => [
  {
    name: t('accountAudit.size.mini'),
    value: 'mini',
  },
  {
    name: t('accountAudit.size.small'),
    value: 'small',
  },
  {
    name: t('accountAudit.size.medium'),
    value: 'medium',
  },
  {
    name: t('accountAudit.size.large'),
    value: 'large',
  },
])
const columns = computed<TableColumnData[]>(() => [
  {
    title: t('accountAudit.columns.index'),
    dataIndex: 'index',
    slotName: 'index',
  },
  {
    title: t('accountAudit.columns.uid'),
    dataIndex: 'uid',
  },
  {
    title: t('accountAudit.columns.identityType'),
    dataIndex: 'identityType',
    render: ({ record }) => {
      const identityTypeOption = identityTypeOptions.value.find((option) => option.value === record.identityType)
      return identityTypeOption ? identityTypeOption.label : ''
    },
  },
  {
    title: t('accountAudit.columns.identifier'),
    dataIndex: 'identifier',
    slotName: 'identifier',
  },
  {
    title: t('accountAudit.columns.status'),
    dataIndex: 'status',
    render: ({ record }) => {
      const statusOption = statusOptions.value.find((option) => option.value === record.status)
      return statusOption ? statusOption.label : ''
    },
  },
  {
    title: t('accountAudit.columns.createTime'),
    dataIndex: 'createTime',
  },
  {
    title: t('accountAudit.columns.operations'),
    dataIndex: 'operations',
    slotName: 'operations',
  },
])
const identityTypeOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('accountAudit.form.identityType.username'),
    value: 1,
  },
  {
    label: t('accountAudit.form.identityType.email'),
    value: 2,
  },
  {
    label: t('accountAudit.form.identityType.mobileNumver'),
    value: 3,
  },
  {
    label: t('accountAudit.form.identityType.QQ'),
    value: 4,
  },
  {
    label: t('accountAudit.form.identityType.wechart'),
    value: 5,
  },
  {
    label: t('accountAudit.form.identityType.tencentWeibo'),
    value: 6,
  },
  {
    label: t('accountAudit.form.identityType.sinaWeibo'),
    value: 7,
  },
])
const statusOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('accountAudit.form.status.waitAudit'),
    value: 0,
  },
  {
    label: t('accountAudit.form.status.accepet'),
    value: 1,
  },
  {
    label: t('accountAudit.form.status.reject'),
    value: 2,
  },
])
const fetchData = async (params: UserAuthParams = { current: 1, pageSize: 10 }) => {
  setLoading(true)
  try {
    const { data } = await AuditAccountPageList(params)
    console.log(JSON.stringify(data))
    renderData.value = data.list
    console.log(renderData)
    pagination.current = params.current
    pagination.total = data.total
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}

const search = () => {
  fetchData({
    ...basePagination,
    ...formModel.value,
  } as unknown as UserAuthParams)
}
const onPageChange = (current: number) => {
  fetchData({ ...basePagination, current })
}

fetchData()
const reset = () => {
  formModel.value = generateFormModel()
}

const handleSelectDensity = (val: string | number | Record<string, any> | undefined, e: Event) => {
  size.value = val as SizeProps
}

const handleChange = (checked: boolean | (string | boolean | number)[], column: Column, index: number) => {
  if (!checked) {
    cloneColumns.value = showColumns.value.filter((item) => item.dataIndex !== column.dataIndex)
  } else {
    cloneColumns.value.splice(index, 0, column)
  }
}

const exchangeArray = <T extends Array<any>>(array: T, beforeIdx: number, newIdx: number, isDeep = false): T => {
  const newArray = isDeep ? cloneDeep(array) : array
  if (beforeIdx > -1 && newIdx > -1) {
    // 先替换后面的，然后拿到替换的结果替换前面的
    newArray.splice(beforeIdx, 1, newArray.splice(newIdx, 1, newArray[beforeIdx]).pop())
  }
  return newArray
}

const popupVisibleChange = (val: boolean) => {
  if (val) {
    nextTick(() => {
      const el = document.getElementById('tableSetting') as HTMLElement
      const sortable = new Sortable(el, {
        onEnd(e: any) {
          const { oldIndex, newIndex } = e
          exchangeArray(cloneColumns.value, oldIndex, newIndex)
          exchangeArray(showColumns.value, oldIndex, newIndex)
        },
      })
    })
  }
}
//  审核通过
const acceptAudit = async (record: UserAuth) => {
  setLoading(true)
  try {
    console.log('Accepted record:', record)
    const data: HttpResponse<string> = await AcceptAudit({ uid: record.uid })
    if (data.flag) {
      Message.success('审核已通过')
      search();
    } else {
      Message.error('审核操作失败')
    }
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}
//  审核驳回
const rejectAudit = async (record: UserAuth) => {
  setLoading(true)
  try {
    console.log('Rejected record:', record)
    const data: HttpResponse<string> = await RejectAudit({ uid: record.uid })
    console.log(JSON.stringify(data))
    if (data.flag) {
      Message.success('审核已驳回')
      search();
    } else {
      Message.error('审核操作失败')
    }
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}

watch(
  () => columns.value,
  (val) => {
    cloneColumns.value = cloneDeep(val)
    cloneColumns.value.forEach((item, index) => {
      item.checked = true
    })
    showColumns.value = cloneDeep(cloneColumns.value)
  },
  { deep: true, immediate: true }
)
</script>

<script lang="ts">
export default {
  name: 'accountAudit',
}
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
.action-icon {
  margin-left: 12px;
  cursor: pointer;
}
.active {
  color: #0960bd;
  background-color: #e3f4fc;
}
.setting {
  display: flex;
  align-items: center;
  width: 200px;
  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
.button-container {
  display: flex;
  justify-content: space-between;
}
.accept,
.reject {
  flex: 1;
  margin: 0 5px; /* 为按钮之间添加一些间距 */
}
</style>
