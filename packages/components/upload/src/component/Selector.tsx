/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadDrag } from '../composables/useDrag'
import type { UploadToken } from '../token'
import type { UploadFile, UploadFileStatus, UploadProps } from '../types'
import type { ComputedRef, Ref } from 'vue'

import { computed, defineComponent, inject, normalizeClass, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { getFileInfo } from '@idux/components/upload/src/util/file'

import { useCmpClasses } from '../composables/useClasses'
import { useDrag } from '../composables/useDrag'
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
    const fileInputRef: Ref<HTMLInputElement | null> = ref(null)
    const {
      allowDrag,
      dragOver,
      filesSelected: dragFilesSelected,
      onDrop,
      onDragOver,
      onDragLeave,
    } = useDrag(uploadProps)
    const selectorClasses = useSelectorClasses(allowDrag, cpmClasses, dragOver)

    syncDragSelected(uploadProps, dragFilesSelected, onUpdateFiles, startUpload)

    return () => {
      return (
        <div
          class={selectorClasses.value}
          onClick={() => onClick(fileInputRef, uploadProps)}
          onDragover={onDragOver}
          onDrop={onDrop}
          onDragleave={onDragLeave}
        >
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

function useSelectorClasses(allowDrag: ComputedRef<boolean>, cpmClasses: ComputedRef<string>, dragOver: Ref<boolean>) {
  return computed(() =>
    normalizeClass({
      [`${cpmClasses.value}-selector`]: true,
      [`${cpmClasses.value}-selector-drag`]: allowDrag.value,
      [`${cpmClasses.value}-selector-dragover`]: dragOver.value,
    }),
  )
}

function useDir(props: UploadProps) {
  return computed(() => (props.directory ? { directory: 'directory', webkitdirectory: 'webkitdirectory' } : {}))
}

function useAccept(props: UploadProps) {
  return computed(() =>
    props.accept
      ?.split(',')
      .map(type => type.trim())
      .filter(type => type),
  )
}

function onClick(fileInputRef: Ref<HTMLInputElement | null>, props: UploadProps) {
  if (props.disabled) {
    return
  }
  fileInputRef.value?.click()
}

function syncDragSelected(
  props: UploadProps,
  filesSelected: UploadDrag['filesSelected'],
  onUpdateFiles: UploadToken['onUpdateFiles'],
  startUpload: UploadToken['startUpload'],
) {
  watch(filesSelected, files => {
    filesHandle(props, files, onUpdateFiles, startUpload)
  })
}

function onSelect(
  fileInputRef: Ref<HTMLInputElement | null>,
  props: UploadProps,
  onUpdateFiles: UploadToken['onUpdateFiles'],
  startUpload: UploadToken['startUpload'],
) {
  const files = Array.prototype.slice.call(fileInputRef.value?.files ?? []) as File[]
  if (files.length === 0) {
    return
  }
  filesHandle(props, files, onUpdateFiles, startUpload)
}

async function filesHandle(
  props: UploadProps,
  files: File[],
  onUpdateFiles: UploadToken['onUpdateFiles'],
  startUpload: UploadToken['startUpload'],
) {
  const allowedFiles = checkFiles(props, files, props.files)
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

// 上传检查，检查文件的数量和格式
function checkFiles(props: UploadProps, filesSelected: File[], files: UploadFile[]) {
  return checkCount(props, checkAccept(props, filesSelected), files)
}

function checkAccept(props: UploadProps, filesSelected: File[]) {
  if (!props.accept) {
    return
  }
  return filesSelected
}

function checkCount(props: UploadProps, filesSelected: File[], files: UploadFile[]) {
  if (!props.maxCount) {
    return getFormatFiles(filesSelected, props, 'selected')
  }
  // 当为 1 时，始终用最新上传的文件代替当前文件
  if (props.maxCount === 1) {
    return getFormatFiles(filesSelected.slice(0, 1), props, 'selected')
  }
  const remainder = props.maxCount - files.length
  if (remainder <= 0) {
    getFormatFiles(filesSelected, props, 'illegal')
    return []
  }
  if (remainder >= filesSelected.length) {
    return getFormatFiles(filesSelected, props, 'selected')
  }
  const allowed = getFormatFiles(filesSelected.slice(0, remainder), props, 'selected')
  getFormatFiles(filesSelected.slice(remainder), props, 'illegal')
  return allowed
}

// 文件对象初始化
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
