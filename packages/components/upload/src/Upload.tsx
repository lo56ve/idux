/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, provide } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import FileSelector from './component/Selector'
import { useCmpClasses } from './composables/useClasses'
import { useRequest } from './composables/useRequest'
import { uploadToken } from './token'
import { uploadProps } from './types'

export default defineComponent({
  name: 'IxUpload',
  props: uploadProps,
  setup(props, { slots }) {
    const cpmClasses = useCmpClasses()
    const config = useGlobalConfig('upload')
    const [, onUpdateFiles] = useControlledProp(props, 'files', [])
    const { abort, startUpload, upload } = useRequest(props)
    provide(uploadToken, {
      props,
      onUpdateFiles,
      abort,
      startUpload,
      upload,
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
