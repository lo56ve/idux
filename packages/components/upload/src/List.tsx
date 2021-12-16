/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent } from 'vue'

import IxUploadTextList from './component/TextList'
import { uploadListProps } from './types'

export default defineComponent({
  name: 'IxUploadList',
  props: uploadListProps,
  setup() {
    return () => <IxUploadTextList {...{ attrs: uploadListProps }} />
  },
})
