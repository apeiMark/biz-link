<template>
  <div class="register-form-wrapper">
    <div class="register-form-title">{{ $t('register.form.title') }}</div>
    <div class="register-form-sub-title">{{ $t('register.form.subtitle') }}</div>
    <div class="register-form-error-msg">{{ errorMessage }}</div>
    <a-form ref="registerForm" :model="userInfo" class="register-form" layout="vertical" @submit="handleSubmit">
      <a-form-item field="username" :rules="usernameRules as FieldRule<any>[]" :validate-trigger="['change', 'blur']" hide-label>
        <a-input v-model="userInfo.username" :placeholder="$t('register.form.userName.placeholder')">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" :rules="passwordRules as FieldRule<any>[]" :validate-trigger="['change', 'blur']" hide-label>
        <a-input-password v-model="userInfo.password" :placeholder="$t('register.form.password.placeholder')" allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item field="confirmPassword" :rules="confirmPasswordRules as FieldRule<any>[]" hide-label>
        <a-input-password v-model="userInfo.confirmPassword" :placeholder="$t('register.form.password.confirm.placeholder')" allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('register.form.register') }}
        </a-button>
        <a-button type="text" long class="register-form-login-btn" @click="$emit('switchToLogin')">
          {{ $t('register.form.login') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { HttpResponse, register, RegisterRes } from '@/api/user'
import useLoading from '@/hooks/loading'
import { Message } from '@arco-design/web-vue'
import { FieldRule, ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { Md5 } from 'ts-md5'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const errorMessage = ref('')
const { loading, setLoading } = useLoading()

const userInfo = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})

const usernameRules = ref([{ required: true, message: t('register.form.userName.nullErrMsg') }])

const passwordRules = ref([{ required: true, message: t('register.form.password.nullErrMsg') }])

const validateConfirmPassword = (value: string, callback: (error?: string) => void) => {
  console.log(value)
  if (!value) {
    callback(t('register.form.password.confirm.nullErrMsg'))
  } else if (value !== userInfo.password) {
    callback(t('register.form.password.confirm.errMsg'))
  } else {
    callback()
  }
}

const confirmPasswordRules = ref([
  { required: true, message: t('register.form.password.confirm.nullErrMsg') },
  { validator: validateConfirmPassword },
])

const handleSubmit = async ({ errors }: { errors: Record<string, ValidatedError> | undefined; values: Record<string, any> }) => {
  if (loading.value) return
  if (!errors) {
    setLoading(true)
    try {
      // 对密码进行 MD5 加密
      // 定义MD5对象
      const md5: any = new Md5()
      md5.appendAsciiStr(userInfo.password)
      const password = md5.end()
      console.log(password)
      const res: HttpResponse<RegisterRes> = await register({
        identityType: 1,
        identifier: userInfo.username,
        certificate: password,
      })
      if (!res || res.flag === false) {
        const errorMsg = res.msg
        throw new Error(errorMsg)
      }
      const { redirect, ...othersQuery } = router.currentRoute.value.query
      router.push({
        name: (redirect as string) || 'Workplace',
        query: {
          ...othersQuery,
        },
      })
      Message.success(t('register.form.register.success'))
    } catch (err) {
      errorMessage.value = (err as Error).message
    } finally {
      setLoading(false)
    }
  }
}
</script>

<style lang="less" scoped>
.register-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
