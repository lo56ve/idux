/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile, UploadListProps } from '../types'
import type { IconsMap } from '../util/icon'
import type { ComputedRef } from 'vue'

import { defineComponent, inject } from 'vue'

import { useCmpClasses, useListClasses } from '../composables/useClasses'
import { useIcon } from '../composables/useIcon'
import { uploadToken } from '../token'
import { uploadListProps } from '../types'
import { getIconNode } from '../util/icon'

export default defineComponent({
  name: 'IxUploadImageList',
  props: uploadListProps,
  setup(props) {
    const icons = useIcon(props)
    const cpmClasses = useCmpClasses()
    const listClasses = useListClasses('text')
    const { files } = inject(uploadToken, {
      files: { value: [] } as ComputedRef<[]>,
    })

    return () =>
      files.value.length > 0 && (
        <ul class={listClasses.value}>{files.value.map(file => renderItem(file, icons, cpmClasses))}</ul>
      )
  },
})

function renderItem(file: UploadFile, icons: ComputedRef<IconsMap>, cpmClasses: ComputedRef<string>) {
  return (
    <li class={`${cpmClasses.value}-file`}>
      <span>
        <span class={`${cpmClasses.value}-icon-file`}>{getIconNode(icons.value.file)}</span>
        <span>{file.name}</span>
      </span>
      <span>
        <span class={`${cpmClasses.value}-icon-retry`}>{getIconNode(icons.value.retry)}</span>
        <span class={`${cpmClasses.value}-icon-preview`}>{getIconNode(icons.value.preview)}</span>
        <span class={`${cpmClasses.value}-icon-download`}>{getIconNode(icons.value.download)}</span>
        <span class={`${cpmClasses.value}-icon-remove`}>{getIconNode(icons.value.remove)}</span>
      </span>
    </li>
  )
}
