<template>
  {{ value }}<br />
  <IxSpace direction="vertical">
    <IxDatePicker v-model:value="value" clearable></IxDatePicker>
    <IxDatePicker v-model:value="value" type="week" clearable></IxDatePicker>
    <IxDatePicker v-model:value="value" type="month" clearable></IxDatePicker>
    <IxDatePicker v-model:value="value" type="quarter" clearable></IxDatePicker>
    <IxDatePicker v-model:value="value" type="year" clearable></IxDatePicker>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref()
</script>

<style scoped lang="less"></style>
