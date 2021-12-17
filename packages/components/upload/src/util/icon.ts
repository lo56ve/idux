/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNode } from 'vue'

import { h } from 'vue'

import { isString, isUndefined } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

const iconMap = {
  file: 'paper-clip',
  preview: 'eye',
  download: 'download',
  remove: 'close',
  retry: 'reload',
} as const

type IconNodeType = string | boolean | VNode
type Icons = keyof typeof iconMap

export type IconsMap = Record<Icons, Exclude<IconNodeType, true>>

export function getIconNode(icon: Exclude<IconNodeType, true>): VNode | null {
  if (icon === false) {
    return null
  }
  if (isString(icon)) {
    return h(IxIcon, { name: icon })
  }
  return icon
}

export function getIcons(iconProp: Partial<Record<Icons, IconNodeType>>): IconsMap {
  const iconFormat = {} as IconsMap
  let icon: Icons
  for (icon in iconMap) {
    // 默认值
    if (iconProp[icon] === true || isUndefined(iconProp[icon])) {
      iconFormat[icon] = iconMap[icon]
    } else {
      iconFormat[icon] = iconProp[icon] as Exclude<IconNodeType, true>
    }
  }
  return iconFormat
}
