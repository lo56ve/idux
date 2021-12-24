/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadListType, UploadProps } from '../types'
import type { ComputedRef } from 'vue'

import { computed, normalizeClass } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

export function useCmpClasses(): ComputedRef<string> {
  const commonPrefix = useGlobalConfig('common')
  return computed(() => `${commonPrefix.prefixCls}-upload`)
}

export function useListClasses(props: UploadProps, type: UploadListType): ComputedRef<string> {
  const cpmClasses = useCmpClasses()
  return computed(() =>
    normalizeClass([
      `${cpmClasses.value}-list`,
      `${cpmClasses.value}-list-${type}`,
      { [`${cpmClasses.value}-list-disabled`]: props.disabled },
    ]),
  )
}
