/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadListProps, UploadListType } from './types'
import type { UploadList } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed, defineComponent, h } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import IxUploadImageCardList from './component/ImageCardList'
import IxUploadImageList from './component/ImageList'
import IxUploadTextList from './component/TextList'
import { uploadListProps } from './types'

const cpmMap = {
  text: IxUploadTextList,
  image: IxUploadImageList,
  imageCard: IxUploadImageCardList,
} as const

export default defineComponent({
  name: 'IxUploadList',
  props: uploadListProps,
  setup(props) {
    const config = useGlobalConfig('uploadList')
    const listType = useListType(props, config)

    return () => h(cpmMap[listType.value], { ...props })
  },
})

function useListType(props: UploadListProps, config: UploadList): ComputedRef<UploadListType> {
  return computed(() => props.type ?? config.listType)
}
