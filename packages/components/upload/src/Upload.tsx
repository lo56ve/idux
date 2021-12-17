/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, provide } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

import FileSelector from './component/Selector'
import { useCmpClasses } from './composables/useClasses'
import { uploadToken } from './token'
import { uploadProps } from './types'

export default defineComponent({
  name: 'IxUpload',
  props: uploadProps,
  setup(props, { slots }) {
    const cpmClasses = useCmpClasses()
    const [, onUpdateFiles] = useControlledProp(props, 'files', [])
    provide(uploadToken, {
      props,
      onUpdateFiles,
    })

    return () => (
      <div>
        <FileSelector>{slots.default?.()}</FileSelector>
        {slots.list?.()}
        <div class={`${cpmClasses.value}-tip`}>{slots.tip?.()}</div>
      </div>
    )
  },
})
