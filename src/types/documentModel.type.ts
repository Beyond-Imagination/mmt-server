import { Document } from 'dynamoose/dist/Document'
import { Model } from './model.type'

export declare namespace DocumentModel {
  interface User extends Model.User, Document {}
}
