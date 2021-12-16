/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile, UploadFileStatus, UploadProps } from './types'
import type { ComputedRef } from 'vue'

import { computed, defineComponent } from 'vue'

import { pick } from 'lodash-es'

import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import FileSelector from './component/Selector'
import { uploadProps } from './types'
import { getFileInfo } from './util/file'

export default defineComponent({
  name: 'IxUpload',
  props: uploadProps,
  setup(props, { slots }) {
    const selectProps = useSelectorProp(props)
    const config = useGlobalConfig('upload')
    const [files, setFiles] = useControlledProp(props, 'files', [])

    return () => (
      <FileSelector {...selectProps.value} onSelect={fileSelected => onSelect(props, fileSelected, files, setFiles)}>
        {slots.default?.()}
      </FileSelector>
    )
  },
})

function useSelectorProp(props: UploadProps) {
  return computed(() => pick(props, ['accept', 'directory', 'disabled', 'multiple']))
}

async function onSelect(
  props: UploadProps,
  fileSelected: File[],
  files: ComputedRef<UploadFile[]>,
  setFiles: (files: UploadFile[]) => void,
) {
  const allowedFiles = handleCountCheck(props, fileSelected, files)
  const handleResult = await callEmit(props.onSelect, allowedFiles)
  const readyUploadFiles = getHandledFiles(handleResult!, allowedFiles)
  console.log(readyUploadFiles)
}

function handleCountCheck(props: UploadProps, fileSelected: File[], files: ComputedRef<UploadFile[]>) {
  if (!props.maxCount) {
    return getFormatFiles(fileSelected, props, 'selected')
  }
  // 当为 1 时，始终用最新上传的文件代替当前文件
  if (props.maxCount === 1) {
    return getFormatFiles(fileSelected.slice(0, 1), props, 'selected')
  }
  const remainder = props.maxCount - files.value.length
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
