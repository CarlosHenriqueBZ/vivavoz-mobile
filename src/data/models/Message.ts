import {Model, Relation} from '@nozbe/watermelondb';
import {date, readonly, field, relation} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

import Complaint from './Complaint';

export default class Message extends Model {
  static table = 'messages';

  static associations: Associations = {
    complaints: {type: 'belongs_to', key: 'complaint_id'},
  };

  @field('key_from_me')
  keyFromMe!: string;

  @field('status')
  status!: number;

  @field('need_push')
  needPush!: number;

  @field('message_type')
  messageType!: string;

  @field('data')
  data!: string;

  @field('media_url')
  mediaUrl!: string;

  @field('media_mime_type')
  mediaMimeType!: string;

  @field('media_size')
  mediaSize!: number | null;

  @field('media_duration')
  mediaDuration!: number | null;

  @field('latitude')
  latitude!: number | null;

  @field('longitude')
  longitude!: number | null;

  @field('thumb_image')
  thumbImage!: string;

  @readonly
  @date('updated_at')
  updatedAt!: number;

  @readonly
  @date('created_at')
  createdAt!: number;

  @date('server_created_at')
  serverCreatedAt!: number;

  @relation('complaints', 'complaint_id')
  complaint!: Relation<Complaint>;
}
