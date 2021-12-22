/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadToken } from '../token'
import type { UploadFile, UploadFileStatus, UploadProps } from '../types'
import type { Ref } from 'vue'

import { computed, defineComponent, inject, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { getFileInfo } from '@idux/components/upload/src/util/file'

import { useCmpClasses } from '../composables/useClasses'
import { uploadToken } from '../token'

export default defineComponent({
  name: 'IxUploadSelector',
  setup(props, { slots }) {
    const {
      props: uploadProps,
      onUpdateFiles,
      startUpload,
    } = inject(uploadToken, {
      props: {},
      onUpdateFiles: () => {},
      startUpload: () => {},
    } as unknown as UploadToken)
    const dir = useDir(uploadProps)
    const cpmClasses = useCmpClasses()
    const inputClasses = computed(() => `${cpmClasses.value}-input`)
    const selectorClasses = computed(() => `${cpmClasses.value}-selector`)
    const fileInputRef: Ref<HTMLInputElement | null> = ref(null)

    return () => {
      return (
        <div class={selectorClasses.value} onClick={() => onClick(fileInputRef, uploadProps)}>
          <input
            {...dir.value}
            class={inputClasses.value}
            type="file"
            ref={fileInputRef}
            accept={uploadProps.accept}
            multiple={uploadProps.multiple}
            onClick={e => e.stopPropagation()}
            onChange={() => onSelect(fileInputRef, uploadProps, onUpdateFiles, startUpload)}
          />
          {slots.default?.()}
        </div>
      )
    }
  },
})

function useDir(props: UploadProps) {
  return computed(() => (props.directory ? { directory: 'directory', webkitdirectory: 'webkitdirectory' } : {}))
}

function onClick(fileInputRef: Ref<HTMLInputElement | null>, props: UploadProps) {
  if (props.disabled) {
    return
  }
  fileInputRef.value?.click()
}

async function onSelect(
  fileInputRef: Ref<HTMLInputElement | null>,
  props: UploadProps,
  onUpdateFiles: UploadToken['onUpdateFiles'],
  startUpload: UploadToken['startUpload'],
) {
  const files = Array.prototype.slice.call(fileInputRef.value?.files ?? []) as File[]
  if (files.length === 0) {
    return
  }
  const allowedFiles = handleCountCheck(props, files, props.files)
  const handleResult = props.onSelect ? await callEmit(props.onSelect, allowedFiles) : allowedFiles
  const readyUploadFiles = getHandledFiles(handleResult!, allowedFiles)
  if (props.maxCount === 1) {
    callEmit(onUpdateFiles, readyUploadFiles)
  } else {
    callEmit(onUpdateFiles, props.files.concat(readyUploadFiles))
  }

  readyUploadFiles.forEach(file => {
    startUpload(file)
  })
}

function handleCountCheck(props: UploadProps, fileSelected: File[], files: UploadFile[]) {
  if (!props.maxCount) {
    return getFormatFiles(fileSelected, props, 'selected')
  }
  // 当为 1 时，始终用最新上传的文件代替当前文件
  if (props.maxCount === 1) {
    return getFormatFiles(fileSelected.slice(0, 1), props, 'selected')
  }
  const remainder = props.maxCount - files.length
  if (remainder <= 0) {
    getFormatFiles(fileSelected, props, 'illegal')
    return []
  }
  if (remainder >= fileSelected.length) {
    return getFormatFiles(fileSelected, props, 'selected')
  }
  const allowed = getFormatFiles(fileSelected.slice(0, remainder), props, 'selected')
  getFormatFiles(fileSelected.slice(remainder), props, 'illegal')
  return allowed
}

function getFormatFiles(files: File[], props: UploadProps, status: UploadFileStatus) {
  return files.map(item => {
    const fileInfo = getFileInfo(item, { status })
    callEmit(props.onFileStatusChange, fileInfo)
    return fileInfo
  })
}

function getHandledFiles(handleResult: boolean | UploadFile[], allowedFiles: UploadFile[]) {
  if (handleResult === true) {
    return allowedFiles
  }
  if (handleResult === false) {
    return []
  }
  return handleResult
}
