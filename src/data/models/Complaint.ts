// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Model, Query} from '@nozbe/watermelondb';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Associations} from '@nozbe/watermelondb/Model';
import {
  field,
  json,
  date,
  readonly,
  children,
  action,
} from '@nozbe/watermelondb/decorators';
import {v4 as uuid} from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Message from './Message';

interface ICreateComplaintParams {
  protocol: string;
  status: number;
  involvedsId: string[];
}

export default class Complaint extends Model {
  static table = 'complaints';

  static associations: Associations = {
    messages: {type: 'has_many', foreignKey: 'complaint_id'},
  };

  @field('protocol')
  protocol!: string;

  @field('status')
  status!: number;

  @field('type')
  type!: string;

  @field('state')
  state!: string;

  @field('iscovid')
  isCovid!: boolean;

  @field('got_covid')
  gotCovid!: string;

  @field('got_covid_more')
  gotCovidMore!: string;

  @field('where_got_covid')
  whereGotCovid!: string;

  @field('how_many_got_covid')
  howManyGotCovid!: string;

  @field('covid_risk')
  covidRisk!: string;

  @field('unseen_msg_count')
  unseenMsgCount!: number;

  @field('worker_id')
  workerId!: string;

  @field('company_id')
  companyId!: string;

  @field('city_id')
  cityId!: string;

  @field('syndicate_id')
  syndicateId!: string;

  @readonly
  @date('updated_at')
  updatedAt!: number;

  @readonly
  @date('created_at')
  createdAt!: number;

  @children('messages')
  messages!: Query<Message>;
}
