/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disabled */

import type { UploadFile, UploadProps } from './types'
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

// todo
function onSelect(
  props: UploadProps,
  fileSelected: File[],
  files: ComputedRef<UploadFile[]>,
  setFiles: (files: UploadFile[]) => void,
) {
  let resultFiles = []
  if (props.maxCount === 1) {
    const allowFiles = fileSelected.slice(0, 1).map(item => {
      const fileInfo = getFileInfo(item, { status: 'selected' })
      callEmit(props.onFileStatusChange, fileInfo)
      return fileInfo
    })
    resultFiles = allowedFiles.length > 0 ? allowedFiles : files.value
  } else {
    resultFiles = handleCheckCount(props, fileSelected)
  }
  callEmit(props.onSelect)
}

function handleCheckCount(props: UploadProps, fileSelected: File[], files: ComputedRef<UploadFile[]>) {
  if (!props.maxCount) {
    return fileSelected
  }
  const remainder = props.maxCount - files.value.length
  if (remainder <= 0) {
    return []
  }
  if (remainder >= fileSelected.length) {
    return fileSelected
  }
  const allowed = fileSelected.slice(0, remainder).map(item => getFileInfo(item, { status: 'selected' }))
  const unAllowed = fileSelected.slice(remainder)
  unAllowed.forEach(item => {
    callEmit(props.onFileStatusChange, getFileInfo(item, { status: 'illegal' }))
  })
  allowed.forEach(item => {
    callEmit(props.onFileStatusChange, item)
  })
  return allowed
}
