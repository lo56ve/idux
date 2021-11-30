/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DatePickerProps } from '../types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { DateConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed, watch } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface PanelStateContext {
  panelDate: ComputedRef<Date>
  setPanelDate: (value: Date) => void
  disabledPanelDate: ComputedRef<(date: Date) => boolean>
  handlePanelCellClick: (date: Date) => void
}

export function usePanelState(
  props: DatePickerProps,
  dateConfig: DateConfig,
  accessor: FormAccessor,
  format: ComputedRef<string>,
): PanelStateContext {
  const [panelDate, setPanelDate] = useState(dateConfig.covert(accessor.valueRef.value, format.value))

  watch(accessor.valueRef, value => {
    const { covert, isSame } = dateConfig
    const currValue = covert(value)
    if (!isSame(panelDate.value, currValue, props.type)) {
      setPanelDate(currValue)
    }
  })

  const disabledPanelDate = computed(() => {
    const { disabledDate } = props
    if (!disabledDate) {
      return () => false
    }
    return (date: Date) => disabledDate(date)
  })

  const handlePanelCellClick = (date: Date) => {
    if (!accessor.valueRef.value || !dateConfig.isSame(date, panelDate.value, props.type)) {
      accessor.setValue(date)
    }
  }

  return {
    panelDate,
    setPanelDate,
    disabledPanelDate,
    handlePanelCellClick,
  }
}
