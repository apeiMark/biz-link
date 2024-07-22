<template>
  <div class="card-wrap">
    <a-card v-if="loading" :bordered="false" hoverable>
      <slot name="skeleton"></slot>
    </a-card>
    <a-card v-else :bordered="false" hoverable>
      <a-space align="start">
        <a-avatar v-if="icon" :size="24" style="margin-right: 8px; background-color: #626aea">
          <icon-filter />
        </a-avatar>
        <a-card-meta>
          <template #title>
            <a-typography-text style="margin-right: 10px">
              {{ title }}
            </a-typography-text>
            <template v-if="showTag">
              <a-tag v-if="open && isExpires === false" size="small" color="green">
                <template #icon>
                  <icon-check-circle-fill />
                </template>
                <span>{{ tagText }}</span>
              </a-tag>
              <a-tag v-else-if="isExpires" size="small" color="red">
                <template #icon>
                  <icon-check-circle-fill />
                </template>
                <span>{{ expiresTagText }}</span>
              </a-tag>
            </template>
          </template>
          <template #description>
            <div>
              {{ createTime }}
            </div>
            <div>
              {{ description }}
            </div>
            <slot></slot>
          </template>
        </a-card-meta>
      </a-space>
      <template #actions>
        <a-switch v-if="actionType === 'switch'" v-model="open" />
        <a-space v-else-if="actionType === 'button'">
          <template v-if="isExpires">
            <a-button type="outline" @click="renew">
              {{ expiresText }}
            </a-button>
          </template>
          <template v-else>
            <a-button v-if="open" @click="handleToggle">
              {{ closeTxt }}
            </a-button>
            <a-button v-else-if="!open" type="outline" @click="handleToggle">
              {{ openTxt }}
            </a-button>
          </template>
        </a-space>
        <div v-else>
          <a-space>
            <a-button @click="handleDelete">
              {{ closeTxt }}
            </a-button>
            <a-button type="primary" @click="handleClick">
              {{ openTxt }}
            </a-button>
            <a-drawer :width="340" :visible="visible" ok-text="编辑" unmount-on-close @ok="handleEdit" @cancel="handleCancel">
              <template #title>"{{ title }}"详情</template>
              <div>
                <a-form :model="$props.item" :style="{ width: '300px' }" @submit="handleEdit">
                  <a-form-item field="title" tooltip="标题应当在3-10个字符以内" label="标题">
                    <a-input v-model="$props.item.title" placeholder="请输入文档库的标题" />
                  </a-form-item>
                  <a-form-item field="description" tooltip="描述应当在200个字符以内" label="描述">
                    <a-input v-model="$props.item.description" placeholder="请输入文档描述" />
                  </a-form-item>
                </a-form>
              </div>
            </a-drawer>
          </a-space>
        </div>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { deleteFileLibrary, editFileLibrary, HttpResponse, ServiceRecord } from '@/api/file'
import useLoading from '@/hooks/loading'
import { Message } from '@arco-design/web-vue'
import { useToggle } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  actionType: {
    type: String,
    default: '',
  },
  defaultValue: {
    type: Boolean,
    default: false,
  },
  openTxt: {
    type: String,
    default: '',
  },
  closeTxt: {
    type: String,
    default: '',
  },
  expiresText: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  showTag: {
    type: Boolean,
    default: true,
  },
  tagText: {
    type: String,
    default: '',
  },
  expires: {
    type: Boolean,
    default: false,
  },
  expiresTagText: {
    type: String,
    default: '',
  },
  item: {
    type: Object,
    required: true,
  },
  createTime: {
    type: String,
    default: '',
  },
})

const { setLoading } = useLoading(true)

const visible = ref(false)

const handleClick = () => {
  visible.value = true
}

const handleCancel = () => {
  visible.value = false
}

const handleEdit = async () => {
  setLoading(true)
  try {
    // 类型断言确保 item 是 ServiceRecord 类型
    const item = props.item as ServiceRecord
    console.log(item)
    const data: HttpResponse<string> = await editFileLibrary(item)
    if (data.flag) {
      Message.success('编辑成功')
    } else {
      Message.error('编辑失败')
    }
  } catch (err) {
    // you can report use errorHandler or other
    Message.error('编辑异常')
  } finally {
    visible.value = false
    setLoading(false)
  }
}

const handleDelete = async () => {
  setLoading(true)
  try {
    // 类型断言确保 item 是 ServiceRecord 类型
    const item = props.item as ServiceRecord
    console.log(item)
    const data: HttpResponse<string> = await deleteFileLibrary({ id: item.id })
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

const [open, toggle] = useToggle(props.defaultValue)
const handleToggle = () => {
  toggle()
}
const isExpires = ref(props.expires)
const renew = () => {
  isExpires.value = false
}
</script>

<style scoped lang="less">
.card-wrap {
  height: 100%;
  transition: all 0.3s;
  border: 1px solid var(--color-neutral-3);
  border-radius: 4px;
  &:hover {
    transform: translateY(-4px);
    // box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  }
  :deep(.arco-card) {
    height: 100%;
    border-radius: 4px;
    .arco-card-body {
      height: 100%;
      .arco-space {
        width: 100%;
        height: 100%;
        .arco-space-item {
          height: 100%;
          &:last-child {
            flex: 1;
          }
          .arco-card-meta {
            height: 100%;
            display: flex;
            flex-flow: column;
            .arco-card-meta-content {
              flex: 1;
              .arco-card-meta-description {
                margin-top: 8px;
                color: rgb(var(--gray-6));
                line-height: 20px;
                font-size: 12px;
              }
            }
            .arco-card-meta-footer {
              margin-top: 0;
            }
          }
        }
      }
    }
  }
  :deep(.arco-card-meta-title) {
    display: flex;
    align-items: center;

    // To prevent the shaking
    line-height: 28px;
  }
  :deep(.arco-skeleton-line) {
    &:last-child {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
}
</style>
