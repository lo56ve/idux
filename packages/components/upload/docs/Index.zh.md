---
category: components
type: 数据录入
title: Upload
subtitle: 文件上传
order: 0
---



## API

### IxUpload

#### UploadProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:files` | 文件列表 | `UploadFile[]` | `[]` | -  | - |
| `accept` | 允许上传的文件类型，详见[原生input accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file) | `string` | - | - | - |
| `action` | 上传文件的地址，必填 | `string \| (file: UploadFile) => Promise<string> `  | - | - | - |
| `maxCount` | 限制上传文件的数量。当为 1 时，始终用最新上传的文件代替当前文件 | `number` | -  | -  | - |
| `multiple` | 是否支持多选文件，开启后按住 ctrl 可选择多个文件 | `boolean` | `false` | - | - |
| `dragable` | 是否启用拖拽上传 | `boolean` | `false` | -  | - |
| `directory` | 支持上传文件夹（[caniuse](https://caniuse.com/#feat=input-file-directory)） | `boolean`                                                    | `false`      | -        | -    |
| `disabled` | 是否禁用 | `boolean` | `false` | -  | - |
| `name` | 发到后台的文件参数名 | `string` | `file` | -  | - |
| `parallel` | 是否开启并行上传 | `boolean` | `true` | -  | - |
| `withCredentials` | 请求是否携带cookie | `boolean` | `false` | - | - |
| `customRequest` | 覆盖内置的上传行为，自定义上传实现 | `(option: UploadRequestOption) => void` | -  | - | - |
| `requestData` | 上传附加的参数  | `Record<string, unknown> \| ((file: UploadFile) => Record<string, unknown> \| Promise<Record<string, unknown>>)` | - | - | - |
| `requestHeaders` | 设置上传请求的请求头  | `object` | -  | -  | -  |
| `requestMethod` | 上传请求的http method | `string` | `post` | -  | - |
| `onSelect` | 选中文件时钩子 | `(file: UploadFile[]) => boolean \| UploadFile[] \| Promise<boolean \| UploadFile[]>` | `() => true` | - | - |
| `onFileStatusChange` | 上传文件改变时的状态 | `(file: UploadFile) => void` | - | - | - |
| `onBeforeUpload`   | 文件上传前的钩子，根据返回结果是否上传<br />返回`false`阻止上传<br />返回`Promise`对象`reject`时停止上传<br />返回`Promise`对象`resolve`时开始上传 | `(file: UploadFile \| UploadFile[]) => boolean \| Promise<boolean>` | `() => true` | -        | -    |
| `onRequestChange` | 请求状态改变的钩子 | `(option: UploadRequestChangeParam) => void` | - | - | - |


### IxUploadFiles 上传文件列表展示

#### UploadFilesProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 展示的形式 | `text \| image \| imageCard` | - | - | - |
| `thumb` | 展示的缩略图，false不展示缩略图，string作为缩略图url | `false \| ((file: UpLoadFile) => string \| false \| Promise<string \| false>)` | -        | -        | -    |
| `icon` | 展示的icon   | `Record<file \| preview \| download \| remove \| retry, string \| boolean \| VNode `>  | `{file: 'paper-clip', preview: 'eye', download: 'download', remove: 'close', retry: 'reload'}` | -        | -    |
| `onDownload`   | 点击下载文件时的回调，如果没有指定，则默认跳转到文件 url 对应的标签页。<br />返回值为 false 时不移除，支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不允许下载 | `(file: UploadFile) => boolean \| Promise<boolean>` | -            | -        | -    |
| `onPreview`    | 点击文件链接或预览图标时的回调，返回值同上                   | `(file: UploadFile) => boolean \| Promise<boolean>` | -            | -        | -    |
| `onRemove`     | 点击移除文件时的回调，返回值同上                             | `(file: UploadFile) => boolean \| Promise<boolean>` | -            | -        | -    |
| `onRetry`      | 点击重新上传时的回调，返回值同上                             | `(file: UploadFile) => boolean \| Promise<boolean>` | -            | -        | -    |


#### IxUploadSlots

| 名称       | 说明                     | 参数类型                                 | 备注 |
| ---------- | ------------------------ | ---------------------------------------- | ---- |
| `default`  | 上传组件选择器的展示形式 | `slotProp`                               |      |
| `list` | 文件列表自定义渲染       | `{fileList: UploadFile[], opr: FileOpr}` | -    |
| `tip`      | 上传提示区               | -                                        | -    |

```typescript
// 上传文件
interface UploadFile extends File {
  uid: VKey // 唯一标识
  name: string // 文件名
  status: 'selected' | 'uploading' | 'error' | 'success'  | 'removed' // 当前状态
  thumbUrl?: string  // 缩略图链接
  downloadUrl?: string  // 下载链接
  percent?: number // 上传进度
  xhr?: XMLHttpRequest // xhr对象
  response?: Response // 服务端响应内容
}

// 自定义上传方法的参数
interface UploadRequestOption {
  onProgress?: (event: UploadProgressEvent) => void
  onEnd?: (res: Response, xhr: XMLHttpRequest) => void // todo
  data?: Record<string, unknown>
  filename?: string
  file: Exclude<UploadBeforeFileType, File | boolean> | UploadFile
  withCredentials?: boolean
  action: string
  headers?: UploadRequestHeader
  method: UploadRequestMethod
}

// 请求状态改变钩子参数
interface UploadRequestChangeOption {
  file: UploadFile
  status: 'loadstart' | 'progress' | 'abort' | 'error' | 'load' | 'timeout' | 'loadend'
  res?: Response
  xhr?: XMLHttpRequest
  e?: ProgressEvent
}
```
