/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FileOperation } from '../composables/useOperation'
import type { UploadToken } from '../token'
import type { UploadFile, UploadListProps } from '../types'
import type { IconsMap } from '../util/icon'
import type { ComputedRef } from 'vue'

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { IxProgress } from '@idux/components/progress'
import { IxTooltip } from '@idux/components/tooltip'

import { useCmpClasses, useListClasses } from '../composables/useClasses'
import { useIcon } from '../composables/useIcon'
import { useOperation } from '../composables/useOperation'
import { uploadToken } from '../token'
import { uploadListProps } from '../types'
import { renderIcon } from '../util/icon'
import { showDownload, showErrorTip, showProgress, showRetry } from '../util/visible'

export default defineComponent({
  name: 'IxUploadTextList',
  props: uploadListProps,
  setup(listProps) {
    const {
      props: uploadProps,
      upload,
      abort,
      onUpdateFiles,
    } = inject(uploadToken, {
      props: { files: [] },
      upload: () => {},
      abort: () => {},
      onUpdateFiles: () => {},
    } as unknown as UploadToken)
    const icons = useIcon(listProps)
    const cpmClasses = useCmpClasses()
    const listClasses = useListClasses('text')
    const files = computed(() => uploadProps.files)
    const fileOperation = useOperation(files, listProps, { abort, upload, onUpdateFiles })

    return () =>
      files.value.length > 0 && (
        <ul class={listClasses.value}>
          {files.value.map(file => renderItem(listProps, file, icons, cpmClasses, fileOperation))}
        </ul>
      )
  },
})

function renderItem(
  listProps: UploadListProps,
  file: UploadFile,
  icons: ComputedRef<IconsMap>,
  cpmClasses: ComputedRef<string>,
  fileOperation: FileOperation,
) {
  const fileClasses = normalizeClass([`${cpmClasses.value}-file`, `${cpmClasses.value}-file-${file.status}`])
  return (
    <li class={fileClasses}>
      <span>
        {renderIcon(icons.value.file, { class: `${cpmClasses.value}-icon-file` })}
        {renderFileName(listProps, file, cpmClasses, fileOperation)}
      </span>
      <span>
        <IxTooltip title={file.errorTip}>
          {showErrorTip(file) && renderIcon('exclamation-circle', { class: `${cpmClasses.value}-icon-error` })}
        </IxTooltip>
        {showRetry(file) &&
          renderIcon(icons.value.retry, {
            class: `${cpmClasses.value}-icon-retry`,
            onClick: () => fileOperation.retry(file),
          })}
        {showDownload(file) &&
          renderIcon(icons.value.download, {
            class: `${cpmClasses.value}-icon-download`,
            onClick: () => fileOperation.download(file),
          })}
        {renderIcon(icons.value.remove, {
          class: `${cpmClasses.value}-icon-remove`,
          onClick: () => fileOperation.remove(file),
        })}
      </span>
      {showProgress(file) && (
        <IxProgress
          class={`${cpmClasses.value}-progress`}
          percent={file.percent}
          strokeColor="#20CC94"
          strokeWidth={2}
          hide-info
        ></IxProgress>
      )}
    </li>
  )
}

function renderFileName(
  listProps: UploadListProps,
  file: UploadFile,
  cpmClasses: ComputedRef<string>,
  fileOperation: FileOperation,
) {
  if (file.status === 'success') {
    if (listProps.onPreview) {
      return (
        <span class={`${cpmClasses.value}-name`} onClick={() => fileOperation.preview(file)}>
          {file.name}
        </span>
      )
    }
    return (
      <a class={`${cpmClasses.value}-name`} href={file.thumbUrl ?? file.url} target="_blank">
        {file.name}
      </a>
    )
  }
  return <span class={`${cpmClasses.value}-name`}>{file.name}</span>
}
