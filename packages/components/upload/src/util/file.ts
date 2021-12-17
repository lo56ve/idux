/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile } from '../types'
import type { VNode } from 'vue'

import { h } from 'vue'

import { isString } from 'lodash-es'

import { uniqueId } from '@idux/cdk/utils'

export function getFileInfo(file: File | UploadFile, options: Partial<UploadFile> = {}): UploadFile {
  const uid = (file as UploadFile)?.uid ?? uniqueId()
  return Object.assign(
    file,
    {
      uid,
    },
    options,
  )
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
  const thumbSrc = window.URL.createObjectURL(file)
  return h('img', {
    src: thumbSrc,
    alt: file.name,
    style: { height: '100%', width: '100%' },
    onLoad: () => window.URL.revokeObjectURL(thumbSrc),
  })
}

export function isImage(file: UploadFile): boolean {
  return !!file.type && file.type.startsWith('image/')
}
