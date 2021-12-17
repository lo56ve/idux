/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, VNode } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

type DataType = Record<string, unknown>
export type UploadRequestHeader = Record<string, string>
export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch'
export type UploadRequestStatus = 'loadstart' | 'progress' | 'abort' | 'error' | 'load' | 'timeout' | 'loadend'
export type UploadFileStatus = 'illegal' | 'selected' | 'uploading' | 'error' | 'success' | 'removed'
export type UploadListType = 'text' | 'image' | 'imageCard'
export type UploadIconType = 'file' | 'preview' | 'download' | 'remove' | 'retry'
export interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number
}
export interface UploadFile extends File {
  uid: VKey
  name: string
  status?: UploadFileStatus
  thumbUrl?: string
  downloadUrl?: string
  percent?: number
  xhr?: XMLHttpRequest
  response?: Response // todo，单个文件的响应
}
export interface UploadRequestOption {
  onProgress?: (event: UploadProgressEvent) => void
  onEnd?: (res: Response, xhr: XMLHttpRequest) => void // todo
  data?: DataType
  filename?: string
  file: UploadFile
  withCredentials?: boolean
  action: string
  headers?: UploadRequestHeader
  method: UploadRequestMethod
}
export interface UploadRequestChangeOption {
  file: UploadFile
  status: UploadRequestStatus
  res?: Response
  xhr?: XMLHttpRequest
  e?: ProgressEvent
}

export const uploadProps = {
  files: IxPropTypes.array<UploadFile>().isRequired,
  accept: IxPropTypes.string,
  action: IxPropTypes.oneOfType([String, IxPropTypes.func<(file: UploadFile) => Promise<string>>()]).isRequired,
  dragable: IxPropTypes.bool,
  directory: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  maxCount: IxPropTypes.number,
  multiple: IxPropTypes.bool,
  name: IxPropTypes.string,
  parallel: IxPropTypes.bool,
  customRequest: IxPropTypes.func<(option: UploadRequestOption) => void>(),
  withCredentials: IxPropTypes.bool,
  requestData: IxPropTypes.oneOfType<DataType | ((file: UploadFile) => DataType | Promise<DataType>)>([{}, () => ({})]),
  requestHeaders: IxPropTypes.object<UploadRequestHeader>(),
  requestMethod: IxPropTypes.string,
  'onUpdate:files': IxPropTypes.emit<(fileList: UploadFile[]) => void>(),
  onSelect: IxPropTypes.emit<(file: UploadFile[]) => boolean | UploadFile[] | Promise<boolean | UploadFile[]>>(),
  onFileStatusChange: IxPropTypes.emit<(file: UploadFile) => void>(),
  onBeforeUpload: IxPropTypes.emit<(file: UploadFile | UploadFile[]) => boolean | Promise<boolean>>(),
  onRequestChange: IxPropTypes.emit<(option: UploadRequestChangeOption) => void>(),
}
export type UploadProps = IxInnerPropTypes<typeof uploadProps>
export type UploadPublicProps = IxPublicPropTypes<typeof uploadProps>
export type UploadComponent = DefineComponent<Omit<HTMLAttributes, keyof UploadPublicProps> & UploadPublicProps>
export type UploadInstance = InstanceType<DefineComponent<UploadProps>>

export const uploadListProps = {
  type: IxPropTypes.oneOf<UploadListType>(['text', 'image', 'imageCard']),
  icon: IxPropTypes.object<Partial<Record<UploadIconType, string | boolean | VNode>>>(),
  onDownload: IxPropTypes.emit<(file: UploadFile) => boolean | Promise<boolean>>(),
  onPreview: IxPropTypes.emit<(file: UploadFile) => boolean | Promise<boolean>>(),
  onRemove: IxPropTypes.emit<(file: UploadFile) => boolean | Promise<boolean>>(),
  onRetry: IxPropTypes.emit<(file: UploadFile) => boolean | Promise<boolean>>(),
}
export type UploadListProps = IxInnerPropTypes<typeof uploadListProps>
export type UploadListPublicProps = IxPublicPropTypes<typeof uploadListProps>
export type UploadListComponent = DefineComponent<
  Omit<HTMLAttributes, keyof UploadListPublicProps> & UploadListPublicProps
>
export type UploadListInstance = InstanceType<DefineComponent<UploadListProps>>
