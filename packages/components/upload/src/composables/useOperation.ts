/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadToken } from '../token'
import type { UploadFile, UploadListProps } from '../types'
import type { ComputedRef } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { getTargetFile, getTargetFileIndex } from '../util/file'

export interface FileOperation {
  abort: (file: UploadFile) => void
  retry: (file: UploadFile) => void
  download: (file: UploadFile) => void
  preview: (file: UploadFile) => void
  remove: (file: UploadFile) => void
}

export function useOperation(
  files: ComputedRef<UploadFile[]>,
  listProps: UploadListProps,
  opr: Pick<UploadToken, 'abort' | 'upload' | 'onUpdateFiles'>,
): FileOperation {
  const abort = (file: UploadFile) => {
    opr.abort(file)
  }

  const retry = (file: UploadFile) => {
    opr.upload(file)
  }

  const download = (file: UploadFile) => {
    callEmit(listProps.onDownload, file)
  }

  const preview = (file: UploadFile) => {
    callEmit(listProps.onPreview, file)
  }

  const remove = (file: UploadFile) => {
    const curFile = getTargetFile(file, files.value)
    if (!curFile) {
      return
    }
    if (curFile.status === 'uploading') {
      abort(curFile)
    }
    const preFiles = [...files.value]
    preFiles.splice(getTargetFileIndex(curFile, files.value), 1)
    opr.onUpdateFiles(preFiles)
    callEmit(listProps.onRemove, curFile)
  }

  return {
    abort,
    retry,
    download,
    preview,
    remove,
  }
}
