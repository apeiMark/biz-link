<template>
  <a-form ref="formRef" :model="formData" class="form" :label-col-props="{ span: 8 }" :wrapper-col-props="{ span: 16 }">
    <a-form-item
      field="nickname"
      :label="$t('userSetting.basicInfo.form.label.nickname')"
      :rules="[
        {
          required: true,
          message: $t('userSetting.form.error.nickname.required'),
        },
      ]"
    >
      <a-input v-model="formData.nickName" :placeholder="$t('userSetting.basicInfo.placeholder.nickname')" :disabled="disabled" />
    </a-form-item>
    <a-form-item
      field="email"
      :label="$t('userSetting.basicInfo.form.label.email')"
      :rules="[
        {
          required: true,
          message: $t('userSetting.form.error.email.required'),
        },
      ]"
    >
      <a-input v-model="formData.email" :placeholder="$t('userSetting.basicInfo.placeholder.email')" :disabled="disabled" />
    </a-form-item>
    <a-form-item
      field="gender"
      :label="$t('userSetting.basicInfo.form.label.gender')"
      :rules="[
        {
          required: true,
          message: $t('userSetting.form.error.gender.required'),
        },
      ]"
    >
      <a-select v-model="formData.gender" :placeholder="$t('userSetting.basicInfo.placeholder.gender')" :disabled="disabled">
        <a-option :value="1">男</a-option>
        <a-option :value="0">女</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="mobile"
      :label="$t('userSetting.basicInfo.form.label.mobile')"
      :rules="[
        {
          required: true,
          message: $t('userSetting.form.error.mobile.required'),
        },
      ]"
    >
      <a-input v-model="formData.mobile" :placeholder="$t('userSetting.basicInfo.placeholder.mobile')" :disabled="disabled" />
    </a-form-item>
    <a-form-item field="birthday" :label="$t('userSetting.basicInfo.form.label.birthday')">
      <a-input v-model="formData.birthday" :placeholder="$t('userSetting.basicInfo.placeholder.birthday')" :disabled="disabled" />
    </a-form-item>
    <a-form-item
      field="signature"
      :label="$t('userSetting.basicInfo.form.label.signature')"
      :rules="[
        {
          maxLength: 200,
          message: $t('userSetting.form.error.signature.maxLength'),
        },
      ]"
      row-class="keep-margin"
    >
      <a-textarea v-model="formData.signature" :placeholder="$t('userSetting.basicInfo.placeholder.signature')" :disabled="disabled" />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="edit">
          {{ $t('userSetting.edit') }}
        </a-button>
        <a-button type="secondary" @click="reset">
          {{ $t('userSetting.reset') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { editUserInfo } from '@/api/user'
import { BasicInfoModel } from '@/api/user-center'
import useLoading from '@/hooks/loading'
import { useUserStore } from '@/store'
import { Message } from '@arco-design/web-vue'
import { FormInstance } from '@arco-design/web-vue/es/form'
import { ref } from 'vue'

const disabled = ref(true)

const userInfo = useUserStore()
const { setLoading } = useLoading(true)

const formRef = ref<FormInstance>()
const formData = ref<BasicInfoModel>({
  uid: userInfo.uid!,
  email: userInfo.email!,
  nickName: userInfo.nickName!,
  gender: userInfo.gender!,
  mobile: userInfo.mobile!,
  createTime: userInfo.createTime!,
  signature: userInfo.signature!,
  birthday: userInfo.birthday!,
  role: userInfo.role!,
})
const edit = async () => {
  if (disabled.value) {
    disabled.value = false
  } else {
    setLoading(true)
    try {
      const { data } = await editUserInfo(formData.value)
      console.log(JSON.stringify(data))
      Message.success('修改成功')
    } catch (err) {
      // you can report use errorHandler or other
      Message.success('修改失败')
    } finally {
      setLoading(false)
      disabled.value = true
    }
  }
}
const reset = async () => {
  await formRef.value?.resetFields()
}
</script>

<style scoped lang="less">
.form {
  width: 540px;
  margin: 0 auto;
}
</style>
