/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { coverChildren, coverIcon } from '@idux/components/menu/src/contents/Utils'
import { useKey } from '@idux/components/utils'

import { menuToken } from '../../token'
import { menuSubProps } from '../../types'

export default defineComponent({
  name: 'MenuSubFlat',
  props: menuSubProps,
  setup(props) {
    const key = useKey()
    const { slots: menuSlots, mergedPrefixCls, handleClick } = inject(menuToken)!
    const prefixCls = computed(() => `${mergedPrefixCls.value}-sub-flat`)
    const onClick = (evt: Event, type: 'sub' | 'item') => {
      evt.preventDefault()
      handleClick(key, type, evt)
    }

    return () => {
      const { icon, label, children, slots = {}, customIcon, customLabel } = props.data
      const iconRender = customIcon ?? slots.icon ?? 'subIcon'
      const iconSlot = isString(iconRender) ? menuSlots[iconRender] : iconRender
      const labelRender = customLabel ?? slots.label ?? 'subLabel'
      const labelSlot = isString(labelRender) ? menuSlots[labelRender] : labelRender

      const slotProps = props.data
      const iconNode = coverIcon(iconSlot, slotProps, icon)
      const labelNode = labelSlot ? labelSlot(slotProps) : label

      return (
        <li class={prefixCls.value} onClick={props.data.disabled ? undefined : (evt: Event) => onClick(evt, 'sub')}>
          <div class={`${prefixCls.value}-label`}>
            {iconNode}
            <span>{labelNode}</span>
            <ul class={`${prefixCls.value}-content`}>{coverChildren(children, true)}</ul>
          </div>
        </li>
      )
    }
  },
})
