/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile, UploadFileStatus } from '../types'
import type { VNode } from 'vue'

import { h } from 'vue'

import { isString } from 'lodash-es'

import { callEmit, uniqueId } from '@idux/cdk/utils'

export function getFileInfo(file: File, options: Partial<UploadFile> = {}): UploadFile {
  const uid = uniqueId()
  return {
    uid,
    name: file.name,
    raw: Object.assign(file, { uid }),
    percent: 0,
    ...options,
  }
}

export function getTargetFile(file: UploadFile, files: UploadFile[]): UploadFile | undefined {
  const matchKey = file.uid !== undefined ? 'uid' : 'name'
  return files.find(item => item[matchKey] === file[matchKey])
}

export function getTargetFileIndex(file: UploadFile, files: UploadFile[]): number {
  const matchKey = file.uid !== undefined ? 'uid' : 'name'
  return files.findIndex(item => item[matchKey] === file[matchKey])
}

// 图片缩略图
export function getThumbNode(file: UploadFile): VNode | null {
  if (isString(file.thumbUrl)) {
    return h('img', {
      src: file.thumbUrl,
      alt: file.name,
      style: { height: '100%', width: '100%' },
    })
  }
  if (!isImage(file)) {
    return null
  }
  const thumbSrc = window.URL.createObjectURL(file.raw)
  file.thumbUrl = thumbSrc
  return h('img', {
    src: thumbSrc,
    alt: file.name,
    style: { height: '100%', width: '100%' },
    onLoad: () => window.URL.revokeObjectURL(thumbSrc),
  })
}

export function isImage(file: UploadFile): boolean {
  return !!file.raw?.type && file.raw?.type.startsWith('image/')
}

export function setFileStatus(
  file: UploadFile,
  status: UploadFileStatus,
  onFileStatusChange?: ((file: UploadFile) => void) | ((file: UploadFile) => void)[],
): void {
  file.status = status
  onFileStatusChange && callEmit(onFileStatusChange, file)
}
