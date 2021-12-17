/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadToken } from '../token'
import type { UploadFile } from '../types'
import type { IconsMap } from '../util/icon'
import type { ComputedRef } from 'vue'

import { defineComponent, inject } from 'vue'

import { useCmpClasses, useListClasses } from '../composables/useClasses'
import { useIcon } from '../composables/useIcon'
import { uploadToken } from '../token'
import { uploadListProps } from '../types'
import { getThumbNode } from '../util/file'
import { getIconNode } from '../util/icon'

export default defineComponent({
  name: 'IxUploadImageList',
  props: uploadListProps,
  setup() {
    const { props: uploadProps } = inject(uploadToken, { props: { files: [] } } as unknown as UploadToken)
    const icons = useIcon(uploadProps)
    const cpmClasses = useCmpClasses()
    const listClasses = useListClasses('image')

    return () =>
      uploadProps.files.length > 0 && (
        <ul class={listClasses.value}>{uploadProps.files.map(file => renderItem(file, icons, cpmClasses))}</ul>
      )
  },
})

function renderItem(file: UploadFile, icons: ComputedRef<IconsMap>, cpmClasses: ComputedRef<string>) {
  return (
    <li class={`${cpmClasses.value}-file`}>
      <div class={`${cpmClasses.value}-thumb-info`}>
        <span class={`${cpmClasses.value}-thumb`}>{getThumbNode(file)}</span>
        <span>{file.name}</span>
      </div>
      <div>
        <span class={`${cpmClasses.value}-icon-retry`}>{getIconNode(icons.value.retry)}</span>
        <span class={`${cpmClasses.value}-icon-download`}>{getIconNode(icons.value.download)}</span>
        <span class={`${cpmClasses.value}-icon-remove`}>{getIconNode(icons.value.remove)}</span>
      </div>
    </li>
  )
}
