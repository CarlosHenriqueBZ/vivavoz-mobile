import {Model, Relation} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {readonly, field, date, relation} from '@nozbe/watermelondb/decorators';
import Company from './Company';

export default class City extends Model {
  static table = 'cities';

  static association: Associations = {
    companies: {type: 'belongs_to', key: 'company_id'},
  };

  @field('name')
  name!: string;

  @relation('companies', 'company_id')
  company!: Relation<Company>;

  @date('created_at')
  createdAt!: number;

  @date('updated_at')
  updatedAt!: number;
}
