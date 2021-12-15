/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile } from '../types'

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
