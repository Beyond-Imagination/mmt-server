import { model } from 'dynamoose'
import { DocumentModel } from '@/types/documentModel.type'
import { SampleUserSchema } from '@/schema/user.schema'

export default model<DocumentModel.ISampleUser>('byd.example.user', SampleUserSchema)
