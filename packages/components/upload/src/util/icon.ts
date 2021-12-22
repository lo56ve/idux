/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadIconType } from '../types'
import type { VNode } from 'vue'

import { h } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

const iconMap = {
  file: 'paper-clip',
  preview: 'eye',
  download: 'download',
  remove: 'close',
  retry: 'reload',
} as const

type IconNodeType = string | boolean | VNode

export type IconsMap = Partial<Record<UploadIconType, Exclude<IconNodeType, true>>>

export function getIconNode(icon: Exclude<IconNodeType, true>): VNode | null {
  if (icon === false) {
    return null
  }
  if (isString(icon)) {
    return h(IxIcon, { name: icon })
  }
  return icon
}

export function getIcons(iconProp: Partial<Record<UploadIconType, IconNodeType>>): IconsMap {
  const iconFormat = {} as IconsMap
  let icon: UploadIconType
  for (icon in iconProp) {
    // 默认值
    if (iconProp[icon] === true) {
      iconFormat[icon] = iconMap[icon]
    } else {
      iconFormat[icon] = iconProp[icon] as Exclude<IconNodeType, true>
    }
  }
  return iconFormat
}

export function renderIcon(icon: IconsMap[keyof IconsMap] | undefined, props?: Record<string, any>): VNode | null {
  if (!icon) {
    return null
  }
  return h('span', props, [getIconNode(icon)])
}
