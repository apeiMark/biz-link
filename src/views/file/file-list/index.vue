<template>
  <div class="container">
    <Breadcrumb :items="['menu.file', 'menu.file.fileList']" />
    <a-card class="general-card" :title="$t('menu.file.fileList')">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="id" :label="$t('fileList.form.id')">
                  <a-input v-model="formModel.id" :placeholder="$t('fileList.form.id.placeholder')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('fileList.form.name')">
                  <a-input v-model="formModel.name" :placeholder="$t('fileList.form.name.placeholder')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="documentType" :label="$t('fileList.form.documentType')">
                  <a-select v-model="formModel.documentType" :options="fileTypeOptions" :placeholder="$t('fileList.form.selectDefault')" />
                </a-form-item>
              </a-col>
              <a-col :span="9">
              <a-form-item field="libraryId" :label="$t('fileList.form.library')">
                <a-select v-model="formModel.libraryId" :options="libraryOptions" :placeholder="$t('fileList.form.selectDefault')" />
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
              {{ $t('fileList.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('fileList.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleClick">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('fileList.operation.import') }}
           </a-button>
           <a-modal :visible="visible" unmount-on-close okText="创建" @ok="handleUpload" cancelText="取消" @cancel="handleCancel">
              <template #title>{{ $t('cardList.content.create') }}</template>
              <div>
                <a-form :model="form" :style="{ width: '480px' }">
                  <a-form-item field="libraryId" :label="$t('fileList.form.library')" :rules="[{ required: true, message: '必须选择一个文档库存储文档' }]">
                    <a-select v-model="form.libraryId!" :options="libraryOptions" :placeholder="$t('fileList.form.library.placeholder')" />
                  </a-form-item>
                  <a-upload action="http://localhost:22222/api/file-server/document/tmp" :onBeforeUpload="handleBeforeUpload" :limit="1" :show-upload-list="false">
                    <template #upload-button>
                      <a-button type="text">
                        {{ $t('fileList.operation.select') }}
                      </a-button>
                    </template>
                  </a-upload>
                </a-form>
              </div>
            </a-modal>
          </a-space>
        </a-col>
        <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
          <a-tooltip :content="$t('fileList.actions.refresh')">
            <div class="action-icon" @click="search"><icon-refresh size="18" /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('fileList.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption v-for="item in densityList" :key="item.value" :value="item.value" :class="{ active: item.value === size }">
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('fileList.actions.columnSetting')">
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
        <template #operations="{ record }">
          <a-button type="text" size="small" @click="handleDownload(record)">
            {{ $t('fileList.columns.operations.download') }}
          </a-button>
          <a-button type="text" size="small" style="color: red" @click="handleDelete(record)">
            {{ $t('fileList.columns.operations.delete') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { deleteFile, FileParams, FileRecord, getFileList, getLibraryOptionList, HttpResponse, optionList, uploadFile } from '@/api/file'
import useLoading from '@/hooks/loading'
import { Pagination } from '@/types/global'
import { Message } from '@arco-design/web-vue'
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface'
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'
import cloneDeep from 'lodash/cloneDeep'
import Sortable from 'sortablejs'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

type SizeProps = 'mini' | 'small' | 'medium' | 'large'
type Column = TableColumnData & { checked?: true }

const generateFormModel = () => {
  return {
    id: '',
    name: '',
    documentType: '',
    documentSize: 0,
    libraryId: '',
    createTime: [],
    src: '',
  }
}
const { loading, setLoading } = useLoading(true)
const { t } = useI18n()
const renderData = ref<FileRecord[]>([])
const formModel = ref(generateFormModel())
const cloneColumns = ref<Column[]>([])
const showColumns = ref<Column[]>([])

const size = ref<SizeProps>('medium')

const basePagination: Pagination = {
  current: 1,
  pageSize: 20,
}
const pagination = reactive({
  ...basePagination,
})
const densityList = computed(() => [
  {
    name: t('fileList.size.mini'),
    value: 'mini',
  },
  {
    name: t('fileList.size.small'),
    value: 'small',
  },
  {
    name: t('fileList.size.medium'),
    value: 'medium',
  },
  {
    name: t('fileList.size.large'),
    value: 'large',
  },
])
const columns = computed<TableColumnData[]>(() => [
  {
    title: t('fileList.columns.index'),
    dataIndex: 'index',
    slotName: 'index',
  },
  {
    title: t('fileList.columns.id'),
    dataIndex: 'id',
  },
  {
    title: t('fileList.columns.name'),
    dataIndex: 'name',
  },
  {
    title: t('fileList.columns.documentType'),
    dataIndex: 'documentType',
    slotName: 'documentType',
    render: ({ record }) => {
      const fileTypeOption = fileTypeOptions.value.find((option) => option.value === record.documentType)
      return fileTypeOption ? fileTypeOption.label : ''
    },
  },
  {
    title: t('fileList.columns.documentSize'),
    dataIndex: 'documentSize',
  },
  {
    title: t('fileList.columns.library'),
    dataIndex: 'libraryId',
    render: ({ record }) => {
      const libraryOption = libraryOptions.value.find((option) => option.value === record.libraryId)
      return libraryOption ? libraryOption.label : ''
    },
  },
  {
    title: t('fileList.columns.createTime'),
    dataIndex: 'createTime',
  },
  {
    title: t('fileList.columns.operations'),
    dataIndex: 'operations',
    slotName: 'operations',
  },
])
const fileTypeOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('fileList.form.documentType.pdf'),
    value: 'PDF',
  },
  {
    label: t('fileList.form.documentType.txt'),
    value: 'TXT',
  },
  {
    label: t('fileList.form.documentType.docx'),
    value: 'DOCX',
  },
  {
    label: t('fileList.form.documentType.ppt'),
    value: 'PPT',
  },
  {
    label: t('fileList.form.documentType.ppt'),
    value: 'PPTX',
  },
  {
    label: t('fileList.form.documentType.ppt'),
    value: 'XLSX',
  },
  {
    label: t('fileList.form.documentType.ppt'),
    value: 'DOC',
  },
  {
    label: t('fileList.form.documentType.other'),
    value: 'OTHER',
  },
])

const libraryOptions = computed<SelectOptionData[]>(() => libraryOptionList.value!)


const libraryOptionList = ref<SelectOptionData[]>()

const visible = ref(false)

const fileRef = ref()

const form = reactive({
  src: null,
  libraryId: null
})

const handleClick = () => {
  visible.value = true
}
const handleCancel = () => {
  visible.value = false
}

const handleDelete = async (record: FileRecord) => {
  setLoading(true)
  try {
    console.log(record)
    const data: HttpResponse<string> = await deleteFile({ id: record.id })
    if (data.flag) {
      Message.success('删除成功')
    } else {
      Message.error('删除失败')
    }
  } catch (err) {
    // you can report use errorHandler or other
    Message.error('删除异常')
  } finally {
    visible.value = false
    setLoading(false)
  }
}

const handleDownload = (record: FileRecord) => {
  // 创建一个隐藏的链接元素
  const link = document.createElement('a');
  link.href = record.src;
  link.download = record.name;

  // 将链接添加到页面，然后模拟点击下载
  document.body.appendChild(link);
  link.click();

  // 下载完成后，移除链接
  document.body.removeChild(link);
}


const handleBeforeUpload = (file: any) => {
  console.log( `触发`)
  // 保存文件到状态中
  fileRef.value = file
  return true; // 阻止自动上传
}

const handleUpload = async () => {
  if (!form.libraryId || !fileRef.value) {
    Message.error("请选择文档库并上传文件");
    return;
  }

  const formData = new FormData();
  formData.append('file', fileRef.value);
  formData.append('libraryId', form.libraryId);

  // 发起上传请求
  const response : HttpResponse<string> = await uploadFile(formData)
  console.log(`response: ${JSON.stringify(response)}`)
  if(response.flag){
    Message.success('文件上传成功')
    visible.value = false
    form.libraryId = null
    fileRef.value = null
  }else{
    Message.error("文件上传失败");
  }
}

onMounted(async ()=>{
  setLoading(true)
  try {
    const response : HttpResponse<optionList> = await getLibraryOptionList()
    libraryOptionList.value = response.data.list
    console.log(`libraryOptionList.value: ${JSON.stringify(libraryOptionList.value)}`)
    console.log(`libraryOptions: ${JSON.stringify(libraryOptions.value)}`)
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
})

const fetchData = async (params: FileParams = { current: 1, pageSize: 10 }) => {
  setLoading(true)
  try {
    const { data } = await getFileList(params)
    renderData.value = data.list
    pagination.current = params.current
    pagination.total = data.total
    console.log(`renderData: ${JSON.stringify(renderData.value)}`)
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
  } as unknown as FileParams)
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
  name: 'fileList',
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
</style>
