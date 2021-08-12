import { model } from 'dynamoose'
import { DocumentModel } from '@/types/documentModel.type'
import { UserSchema } from '@/schema/user.schema'

export default model<DocumentModel.User>('byd.example.user', UserSchema)
