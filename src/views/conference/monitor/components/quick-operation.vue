<template>
  <a-card
    class="general-card"
    :title="$t('monitor.quick.operation')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '24px 20px 0 20px' }"
  >
    <a-row :gutter="8">
      <a-col :span="8" class="wrapper" @click="openNewTab('http://localhost:5173/', { nickName: nickName,userID: userID })">
        <div class="icon">
          <component :is="'icon-video-camera'"/>
        </div>
        <a-typography-paragraph class="text">
          {{ $t('monitor.contentManagement') }}
        </a-typography-paragraph>
      </a-col>
      <a-col :span="8" class="wrapper" @click="openNewTab('http://localhost:5173/', { nickName: nickName,userID: userID })">
        <div class="icon">
          <component :is="'icon-user-add'" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t('monitor.contentStatistical') }}
        </a-typography-paragraph>
      </a-col>
    </a-row>
    <a-divider class="split-line" style="margin: 0" />
  </a-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


const nickName = ref("JohnDoe")
const userID = ref("1813178945621852160")

function openNewTab(url: string, params: Record<string, any>): void {
  const urlWithParams = new URL(url, window.location.origin);
  Object.keys(params).forEach(key => urlWithParams.searchParams.append(key, params[key]));
  window.open(urlWithParams.toString(), '_blank');
}

</script>

<style scoped lang="less">
/* Add your styles here */
</style>
