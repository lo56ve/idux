import type { UploadComponent } from './src/types'

import Upload from './src/Upload'

const IxUpload = Upload as unknown as UploadComponent

export { IxUpload }

export type { UploadInstance, UploadPublicProps as UploadProps } from './src/types'
