<template>
  <div class="container">
    <div class="logo">
      <img alt="logo" src="http://localhost:8081/biz-common/image/biz-link-logo.svg" />
      <div class="logo-text">企业智联</div>
    </div>
    <LoginBanner />
    <div class="content">
      <div class="content-inner">
        <transition name="slide-fade" mode="out-in">
          <component :is="currentForm" @switchToRegister="showRegisterForm" @switchToLogin="showLoginForm" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginBanner from './components/banner.vue'
import LoginForm from './components/login-form.vue'
import RegisterForm from './components/register-form.vue'

export default defineComponent({
  components: {
    LoginBanner,
    LoginForm,
    RegisterForm,
  },
  setup() {
    const currentForm = ref('LoginForm')
    const showRegisterForm = () => {
      currentForm.value = 'RegisterForm'
    }
    const showLoginForm = () => {
      currentForm.value = 'LoginForm'
    }
    return {
      currentForm,
      showRegisterForm,
      showLoginForm,
    }
  },
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 500px;
  border: 1px solid #dedede;
  width: 900px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);

  .banner {
    width: 400px;
    background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
  }

  .content {
    border-radius: 10px;
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
  }
}

.logo {
  position: fixed;
  top: 24px;
  left: 22px;
  z-index: 1;
  display: inline-flex;
  align-items: center;

  &-text {
    margin-right: 4px;
    margin-left: 4px;
    color: var(--color-fill-1);
    font-size: 20px;
  }
}

/* 添加动画效果 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
