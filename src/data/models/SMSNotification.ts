import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export default class SMSNotification extends Model {
  static table = 'sms_notifications';

  @field('complaint_id')
  complaint_id!: string;

  @field('phone')
  phone!: string;

  @readonly
  @date('created_at')
  createdAt!: number;

  @readonly
  @date('updated_at')
  updatedAt!: number;
}
