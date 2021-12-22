/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile } from '../types'

import { isUndefined } from 'lodash-es'

export function showProgress(file: UploadFile): boolean {
  return file.status === 'uploading' && !isUndefined(file.percent)
}

export function showErrorTip(file: UploadFile): boolean {
  return file.status === 'error' && !!file.errorTip
}

export function showRetry(file: UploadFile): boolean {
  return file.status === 'error'
}

export function showDownload(file: UploadFile): boolean {
  return file.status === 'success'
}
