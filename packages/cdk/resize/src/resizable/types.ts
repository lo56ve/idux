/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BoundaryType } from '@idux/cdk/drag-drop'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { Component, DefineComponent, HTMLAttributes, PropType } from 'vue'

const allHandlePlacements = ['top', 'bottom', 'start', 'end', 'topStart', 'topEnd', 'bottomStart', 'bottomEnd'] as const

export const resizableProps = {
  /**
   * Specifies resize boundaries.
   *
   * @default 'parent'
   */
  boundary: { type: [String, Object] as PropType<BoundaryType>, default: 'parent' },
  disabled: { type: Boolean, default: false },
  free: { type: Boolean, default: false },
  handlers: { type: Array as PropType<ResizableHandlePlacement[]>, default: () => allHandlePlacements },
  is: { type: [String, Object] as PropType<string | Component>, default: 'div' },

  /**
   * Maximum height of resizable element
   *
   * @default Number.MAX_SAFE_INTEGER
   */
  maxHeight: { type: Number, default: Number.MAX_SAFE_INTEGER },
  /**
   * Maximum width of resizable element
   *
   * @default Number.MAX_SAFE_INTEGER
   */
  maxWidth: { type: Number, default: Number.MAX_SAFE_INTEGER },
  /**
   * Minimum height of resizable element
   *
   * @default 8
   */
  minHeight: { type: Number, default: 8 },
  /**
   * Minimum width of resizable element
   *
   * @default 8
   */
  minWidth: { type: Number, default: 8 },
  onResizeStart: [Function, Array] as PropType<MaybeArray<ResizableEvent>>,
  onResizing: [Function, Array] as PropType<MaybeArray<ResizableEvent>>,
  onResizeEnd: [Function, Array] as PropType<MaybeArray<ResizableEvent>>,
} as const

export type ResizableProps = ExtractInnerPropTypes<typeof resizableProps>
export type ResizablePublicProps = ExtractPublicPropTypes<typeof resizableProps>
export type ResizableComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ResizablePublicProps> & ResizablePublicProps
>
export type ResizableInstance = InstanceType<DefineComponent<ResizableProps>>

export const resizableHandleProps = {
  placement: { type: String as PropType<ResizableHandlePlacement>, default: 'bottomEnd' },
} as const

export type ResizableHandleProps = ExtractInnerPropTypes<typeof resizableHandleProps>
export type ResizableHandlePublicProps = ExtractPublicPropTypes<typeof resizableHandleProps>
export type ResizableHandleComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ResizableHandlePublicProps> & ResizableHandlePublicProps
>
export type ResizableHandleInstance = InstanceType<DefineComponent<ResizableHandleProps>>

export type ResizableOptions = Omit<ResizablePublicProps, 'disabled' | 'is' | 'handlers'>

export type ResizableHandlePlacement = typeof allHandlePlacements[number]

export interface ResizePosition {
  width: number
  height: number
  offsetWidth: number
  offsetHeight: number
}

export type ResizableEvent = (position: ResizePosition, evt: PointerEvent) => void
