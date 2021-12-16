/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadListProps } from '../types'
import type { IconsMap } from '../util/icon'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { getIcons } from '../util/icon'

export function useIcon(props: UploadListProps): ComputedRef<IconsMap> {
  return computed(() => getIcons(props.icon ?? {}))
}
