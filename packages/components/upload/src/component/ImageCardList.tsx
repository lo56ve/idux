/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadFile } from '../types'
import type { IconsMap } from '../util/icon'
import type { ComputedRef } from 'vue'

import { defineComponent, inject } from 'vue'

import { IxIcon } from '@idux/components/icon'

import { useCmpClasses, useListClasses } from '../composables/useClasses'
import { useIcon } from '../composables/useIcon'
import { UploadToken, uploadToken } from '../token'
import { uploadListProps } from '../types'
import { getThumbNode } from '../util/file'
import { getIconNode } from '../util/icon'
import FileSelector from './Selector'

export default defineComponent({
  name: 'IxUploadImageCardList',
  props: uploadListProps,
  setup() {
    const { props: uploadProps } = inject(uploadToken, { props: { files: [] } } as unknown as UploadToken)
    const icons = useIcon(uploadProps)
    const cpmClasses = useCmpClasses()
    const listClasses = useListClasses('imageCard')

    return () => (
      <ul class={listClasses.value}>
        {renderSelector(cpmClasses)}
        {uploadProps.files.map(file => renderItem(file, icons, cpmClasses))}
      </ul>
    )
  },
})

function renderItem(file: UploadFile, icons: ComputedRef<IconsMap>, cpmClasses: ComputedRef<string>) {
  return (
    <li class={`${cpmClasses.value}-file`}>
      {getThumbNode(file)}
      <div class={`${cpmClasses.value}-icon`}>
        <span class={`${cpmClasses.value}-icon-preview`}>{getIconNode(icons.value.preview)}</span>
        <span class={`${cpmClasses.value}-icon-retry`}>{getIconNode(icons.value.retry)}</span>
        <span class={`${cpmClasses.value}-icon-download`}>{getIconNode(icons.value.download)}</span>
        <span class={`${cpmClasses.value}-icon-remove`}>{getIconNode(icons.value.remove)}</span>
      </div>
    </li>
  )
}

// function renderUploadingNode() {
//   return <div></div>
// }

function renderSelector(cpmClasses: ComputedRef<string>) {
  return (
    <FileSelector class={`${cpmClasses.value}-selector`}>
      <IxIcon name="plus"></IxIcon>
    </FileSelector>
  )
}
