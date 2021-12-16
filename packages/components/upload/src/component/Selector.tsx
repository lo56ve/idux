/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { UploadSelectorProps } from '../types'
import type { Ref } from 'vue'

import { computed, defineComponent, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { useCmpClasses } from '../composables/useClasses'
import { uploadSelectorProps } from '../types'

export default defineComponent({
  name: 'IxUploadSelector',
  props: uploadSelectorProps,
  setup(props, { slots }) {
    const dir = useDir(props)
    const cpmClasses = useCmpClasses()
    const inputClasses = computed(() => `${cpmClasses.value}-input`)
    const selectorClasses = computed(() => `${cpmClasses.value}-selector`)
    const fileInputRef: Ref<HTMLInputElement | null> = ref(null)

    return () => {
      return (
        <div class={selectorClasses.value} onClick={() => onClick(fileInputRef, props)}>
          <input
            {...dir.value}
            class={inputClasses.value}
            type="file"
            ref={fileInputRef}
            accept={props.accept}
            multiple={props.multiple}
            onClick={e => e.stopPropagation()}
            onChange={() => onSelect(fileInputRef, props)}
          />
          {slots.default?.()}
        </div>
      )
    }
  },
})

function useDir(props: UploadSelectorProps) {
  return computed(() => (props.directory ? { directory: 'directory', webkitdirectory: 'webkitdirectory' } : {}))
}

function onClick(fileInputRef: Ref<HTMLInputElement | null>, props: UploadSelectorProps) {
  if (props.disabled) {
    return
  }
  fileInputRef.value?.click()
}

function onSelect(fileInputRef: Ref<HTMLInputElement | null>, props: UploadSelectorProps) {
  const files = Array.prototype.slice.call(fileInputRef.value?.files ?? []) as File[]
  files.length > 0 && callEmit(props.onSelect, files)
}
