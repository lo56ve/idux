<template>
  <IxUpload v-model:files="files">
    <template #list>
      <IxUploadList type="imageCard" />
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

watchEffect(() => {
  console.log(files.value)
})
</script>
