<template>
  <IxUpload v-model:files="files">
    <IxButton>上传文件</IxButton>
    <template #list>
      <IxUploadList :icon="{ file: 'right' }" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const files = ref([])

watchEffect(() => {
  console.log(files.value)
})
</script>
