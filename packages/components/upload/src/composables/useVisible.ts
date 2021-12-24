/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadListType, UploadProps } from '../types'
import type { ComputedRef } from 'vue'

import { computed, isProxy } from 'vue'

export function useSelectorVisible(
  props: UploadProps,
  listType: ComputedRef<UploadListType> | UploadListType,
): ComputedRef<boolean>[] {
  const isListTypeProxy = isProxy(listType)
  // imageCard自带selector，drag统一用外部
  const outerSelector = computed(
    () => props.dragable || (isListTypeProxy ? listType.value !== 'imageCard' : listType !== 'imageCard'),
  )
  const imageCardSelector = computed(() => !outerSelector.value)
  return [outerSelector, imageCardSelector]
}
