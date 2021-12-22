<template>
  <IxUpload v-model:files="files" action="/upload" :onFileStatusChange="onFileStatusChange">
    <IxButton>上传</IxButton>
    <template #list>
      <IxUploadList type="image" :icon="icon" :onDownload="onDownload" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

// const files = ref([
//   {
//     uid: '123',
//     name: '123.png',
//     status: 'error',
//   },
// ])

const files = ref([])
const icon = ref({ file: true, download: true, retry: true, remove: true, preview: true })
const onDownload = file => {
  console.log(file)
}
const onFileStatusChange = file => {
  // if (file.status === 'error') {
  //   file.errorTip = '错了'
  // }
}

watchEffect(() => {
  console.log(files.value)
})
</script>
