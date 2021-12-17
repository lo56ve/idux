/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile } from '../types'
import type { IconsMap } from '../util/icon'
import type { ComputedRef } from 'vue'

import { defineComponent, inject, normalizeClass } from 'vue'

import { IxProgress } from '@idux/components/progress'

import { useCmpClasses, useListClasses } from '../composables/useClasses'
import { useIcon } from '../composables/useIcon'
import { UploadToken, uploadToken } from '../token'
import { uploadListProps } from '../types'
import { getIconNode } from '../util/icon'

export default defineComponent({
  name: 'IxUploadTextList',
  props: uploadListProps,
  setup() {
    const { props: uploadProps } = inject(uploadToken, { props: { files: [] } } as unknown as UploadToken)
    const icons = useIcon(uploadProps)
    const cpmClasses = useCmpClasses()
    const listClasses = useListClasses('text')

    return () =>
      uploadProps.files.length > 0 && (
        <ul class={listClasses.value}>{uploadProps.files.map(file => renderItem(file, icons, cpmClasses))}</ul>
      )
  },
})

function renderItem(file: UploadFile, icons: ComputedRef<IconsMap>, cpmClasses: ComputedRef<string>) {
  const fileClasses = normalizeClass([`${cpmClasses.value}-file`, `${cpmClasses.value}-file-${file.status}`])
  return (
    <li class={fileClasses}>
      <span>
        <span class={`${cpmClasses.value}-icon-file`}>{getIconNode(icons.value.file)}</span>
        <span class={`${cpmClasses.value}-name`}>{file.name}</span>
      </span>
      <span>
        <span class={`${cpmClasses.value}-icon-error`}>{getIconNode('exclamation-circle')}</span>
        <span class={`${cpmClasses.value}-icon-retry`}>{getIconNode(icons.value.retry)}</span>
        <span class={`${cpmClasses.value}-icon-preview`}>{getIconNode(icons.value.preview)}</span>
        <span class={`${cpmClasses.value}-icon-download`}>{getIconNode(icons.value.download)}</span>
        <span class={`${cpmClasses.value}-icon-remove`}>{getIconNode(icons.value.remove)}</span>
      </span>
      <IxProgress
        class={`${cpmClasses.value}-progress`}
        percent={file.percent ?? 50}
        strokeColor="#20CC94"
        strokeWidth={2}
        hide-info
      ></IxProgress>
    </li>
  )
}
