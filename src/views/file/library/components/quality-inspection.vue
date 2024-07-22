<template>
  <div class="list-wrap">
    <a-typography-title class="block-title" :heading="6">
      {{ $t('cardList.tab.title.content') }}
    </a-typography-title>
    <a-row class="list-row" :gutter="24">
      <!-- 先渲染空卡片 -->
      <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" :xxl="6" class="list-col" @click="handleClick">
        <div class="card-wrap empty-wrap">
          <a-card :bordered="false" hoverable>
            <a-result :status="null" :title="$t('cardList.content.action')">
              <template #icon>
                <icon-plus style="font-size: 20px" />
              </template>
            </a-result>
          </a-card>
        </div>
      </a-col>
      <a-modal :visible="visible" unmount-on-close okText="创建" @ok="handleCreate(form)" cancelText="取消" @cancel="handleCancel">
        <template #title>{{ $t('cardList.content.create') }}</template>
        <div>
          <a-form :model="form" :style="{ width: '300px' }" @submit="handleCreate">
            <a-form-item field="title" tooltip="标题应当在3-10个字符以内" label="标题">
              <a-input v-model="form.title" placeholder="请输入文档库的标题" />
            </a-form-item>
            <a-form-item field="description" tooltip="描述应当在200个字符以内" label="描述">
              <a-input v-model="form.description" placeholder="请输入文档描述" />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>

      <!-- 数据存在时显示卡片 -->
      <template v-if="hasData">
        <a-col v-for="item in renderData" :key="item.id" class="list-col" :xs="12" :sm="12" :md="12" :lg="6" :xl="6" :xxl="6">
          <CardWrap
            :loading="loading"
            :title="item.title"
            :description="item.description"
            :create-time="item.createTime"
            :open-txt="$t('cardList.content.edit')"
            :close-txt="$t('cardList.content.delete')"
            :show-tag="false"
            :item="item"
          >
            <a-descriptions style="margin-top: 16px" :data="item.data" layout="inline-horizontal" :column="2" />
            <template #skeleton>
              <a-skeleton :animation="true">
                <a-skeleton-line :widths="['50%', '50%', '100%', '40%']" :rows="4" />
                <a-skeleton-line :widths="['40%']" :rows="1" />
              </a-skeleton>
            </template>
          </CardWrap>
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { createFileLibrary, getFileLibraryList, HttpResponse, ServiceRecord, ServiceRes } from '@/api/file'
import useLoading from '@/hooks/loading'
import { Message } from '@arco-design/web-vue'
import { computed, onMounted, reactive, ref } from 'vue'
import CardWrap from './card-wrap.vue'

const visible = ref(false)

const handleClick = () => {
  visible.value = true
}
const handleCancel = () => {
  visible.value = false
}

const form = reactive({
  title: '',
  description: '',
})

const { loading, setLoading } = useLoading(true)

const handleCreate = async (data: any) => {
  setLoading(true)
  try {
    console.log(data)
    const response: HttpResponse<string> = await createFileLibrary(data)
    if (response.flag) {
      Message.success('云文档库数据创建成功')
    } else {
      Message.success(`云文档库数据创建失败: ${response.msg}`)
    }
  } catch (err) {
    // you can report use errorHandler or other
    Message.error('云文档库数据获取异常')
  } finally {
    setLoading(false)
  }
  visible.value = false
}

const renderData = ref<ServiceRecord[] | null>([])

onMounted(async () => {
  setLoading(true)
  try {
    const response: HttpResponse<ServiceRes> = await getFileLibraryList()
    renderData.value = response.data.list
    Message.success('云文档库数据获取成功')
  } catch (err) {
    // you can report use errorHandler or other
    Message.error('云文档库数据获取异常')
  } finally {
    setLoading(false)
  }
})

// 计算属性来判断是否有数据
const hasData = computed(() => renderData.value!.length > 0)
</script>

<style scoped lang="less">
.card-wrap {
  height: 100%;
  transition: all 0.3s;
  border: 1px solid var(--color-neutral-3);
  &:hover {
    transform: translateY(-4px);
  }
  :deep(.arco-card-meta-description) {
    color: rgb(var(--gray-6));
    .arco-descriptions-item-label-inline {
      font-weight: normal;
      font-size: 12px;
      color: rgb(var(--gray-6));
    }
    .arco-descriptions-item-value-inline {
      color: rgb(var(--gray-8));
    }
  }
}
.empty-wrap {
  height: 200px;
  border-radius: 4px;
  :deep(.arco-card) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    .arco-result-title {
      color: rgb(var(--gray-6));
    }
  }
}
</style>
