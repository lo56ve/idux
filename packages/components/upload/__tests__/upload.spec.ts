import { mount, MountingOptions } from '@vue/test-utils'
import { renderWork } from '@tests'
import Upload from '../src/Upload'
import { UploadProps } from '../src/types'

describe('Upload', () => {
  const UploadMount = (options?: MountingOptions<Partial<UploadProps>>) => mount(Upload, { ...(options as MountingOptions<UploadProps>)})

  renderWork<UploadProps>(Upload,{
    props: { },
  })
})
