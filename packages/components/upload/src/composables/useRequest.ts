/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { RawFile, UploadFile, UploadProgressEvent, UploadProps } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { Ref } from 'vue'

import { ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { getTargetFile, getTargetFileIndex, setFileStatus } from '../util/file'
import defaultUpload from '../util/request'

export interface UploadRequest {
  fileUploading: Ref<UploadFile[]>
  abort: (file: UploadFile) => void
  startUpload: (file: UploadFile) => void
  upload: (file: UploadFile) => void
}

export function useRequest(props: UploadProps): UploadRequest {
  const fileUploading: Ref<UploadFile[]> = ref([])
  const aborts = new Map<VKey, () => void>([])

  function abort(file: UploadFile): void {
    const curFile = getTargetFile(file, props.files)
    if (!curFile) {
      return
    }
    const curAbort = aborts.get(curFile.uid)
    curAbort?.()
    setFileStatus(curFile, 'abort', props.onFileStatusChange)
    fileUploading.value.splice()
    props.onRequestChange &&
      callEmit(props.onRequestChange, {
        status: 'abort',
        file: curFile,
      })
    aborts.delete(curFile.uid)
    fileUploading.value.splice(getTargetFileIndex(curFile, fileUploading.value))
  }

  function startUpload(file: UploadFile): void {
    if (!props.onBeforeUpload) {
      fileUploading.value.push(file)
      return
    }
    const before = props.onBeforeUpload(file.raw)
    if (before instanceof Promise) {
      before
        .then(result => {
          if (result === true) {
            upload(file)
            return
          }
          if (result instanceof File) {
            upload(result)
          }
        })
        .catch(() => {
          file.status = 'error'
        })
    } else if (before === true) {
      upload(file)
    }
  }

  function upload(file: UploadFile): void {
    const requestOption = {
      file,
      filename: file.name,
      withCredentials: props.withCredentials,
      action: props.action,
      requestHeaders: props.requestHeaders,
      requestMethod: props.requestMethod,
      requestData: props.requestData,
      onProgress: (e: UploadProgressEvent) => _onProgress(e, file),
      onError: (error: Error) => _onError(error, file),
      onSuccess: (res: any) => _onSuccess(res, file),
    }

    const uploadHttpRequest = props.customRequest ?? defaultUpload
    aborts.set(file.uid, uploadHttpRequest(requestOption)?.abort ?? (() => {}))
    fileUploading.value.push(file)
  }

  function _onProgress(e: UploadProgressEvent, file: RawFile): void {
    const curFile = getTargetFile(file, props.files)
    if (!curFile) {
      return
    }
    curFile?.percent = e.percent ?? 0
    props.onRequestChange &&
      callEmit(props.onRequestChange, {
        status: 'progress',
        file: curFile,
        e,
      })
  }

  function _onError(error: Error, file: RawFile): void {
    const curFile = getTargetFile(file, props.files)
    if (!curFile) {
      return
    }
    fileUploading.value.splice(getTargetFileIndex(curFile, fileUploading.value))
    setFileStatus(curFile, 'error', props.onFileStatusChange)
    props.onRequestChange &&
      callEmit(props.onRequestChange, {
        file: curFile,
        status: 'error',
      })
  }

  function _onSuccess(res: any, file: RawFile): void {
    const curFile = getTargetFile(file, props.files)
    if (!curFile) {
      return
    }
    curFile?.response = res
    setFileStatus(curFile, 'success', props.onFileStatusChange)
    props.onRequestChange &&
      callEmit(props.onRequestChange, {
        status: 'loadend',
        file: curFile,
        e,
      })
  }

  return {
    fileUploading,
    abort,
    startUpload,
    upload,
  }
}
