/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FileOperation } from '../composables/useOperation'
import type { UploadToken } from '../token'
import type { UploadFile } from '../types'
import type { IconsMap } from '../util/icon'
import type { ComputedRef } from 'vue'

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { useCmpClasses, useListClasses } from '../composables/useClasses'
import { useIcon } from '../composables/useIcon'
import { useOperation } from '../composables/useOperation'
import { uploadToken } from '../token'
import { UploadListProps, uploadListProps } from '../types'
import { getThumbNode } from '../util/file'
import { renderIcon } from '../util/icon'

export default defineComponent({
  name: 'IxUploadImageList',
  props: uploadListProps,
  setup(listProps) {
    const {
      props: uploadProps,
      upload,
      abort,
      onUpdateFiles,
    } = inject(uploadToken, {
      props: { files: [] },
      upload: () => {},
      abort: () => {},
      onUpdateFiles: () => {},
    } as unknown as UploadToken)
    const icons = useIcon(uploadProps)
    const cpmClasses = useCmpClasses()
    const listClasses = useListClasses('image')
    const files = computed(() => uploadProps.files)
    const fileOperation = useOperation(files, listProps, { abort, upload, onUpdateFiles })

    return () =>
      uploadProps.files.length > 0 && (
        <ul class={listClasses.value}>
          {uploadProps.files.map(file => renderItem(listProps, file, icons, cpmClasses, fileOperation))}
        </ul>
      )
  },
})

function renderItem(
  listProps: UploadListProps,
  file: UploadFile,
  icons: ComputedRef<IconsMap>,
  cpmClasses: ComputedRef<string>,
  fileOperation: FileOperation,
) {
  const fileClasses = normalizeClass([`${cpmClasses.value}-file`, `${cpmClasses.value}-file-${file.status}`])
  return (
    <li class={fileClasses}>
      <div class={`${cpmClasses.value}-thumb-info`}>
        <span class={`${cpmClasses.value}-thumb`}>{getThumbNode(file)}</span>
        <span class={`${cpmClasses.value}-name`}>{file.name}</span>
      </div>
      <div>
        {renderIcon(icons.value.retry, {
          class: `${cpmClasses.value}-icon-retry`,
          onClick: () => fileOperation.retry(file),
        })}
        {renderIcon(icons.value.download, {
          class: `${cpmClasses.value}-icon-download`,
          onClick: () => fileOperation.download(file),
        })}
        {renderIcon(icons.value.remove, {
          class: `${cpmClasses.value}-icon-remove`,
          onClick: () => fileOperation.remove(file),
        })}
      </div>
    </li>
  )
}
