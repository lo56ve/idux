<template>
  <IxUpload
    v-model:files="files"
    accept=".png"
    dragable
    multiple
    :action="action"
    :onFileStatusChange="onFileStatusChange"
  >
    <div style="height: 80px; width: 80px"> sdfsdfsdfsdf </div>
    <template #list>
      <IxUploadList
        type="image"
        :icon="icon"
        :onDownload="onDownload"
        :onPreview="onPreview"
        :onRemove="onRemove"
        :onSelect="onSelect"
      />
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

const action = () => Promise.resolve('/upload')
const files = ref([])
const icon = ref({ file: true, download: true, retry: true, remove: true, preview: true })
const onDownload = file => {
  console.log('download', file)
}

const requestData = file => {
  console.log('requestData', file)
  return {
    a: 1,
    b: 2,
  }
}

const onPreview = file => {
  console.log('preview', file)
}

const onFileStatusChange = file => {
  if (file.status === 'error') {
    file.errorTip = '错了'
  }
  console.log(file.status)
}

const onRemove = file => {
  console.log('remove', file)
}

const onSelect = file => {
  console.log('select', file)
}

watchEffect(() => {
  console.log(files.value)
})
</script>
