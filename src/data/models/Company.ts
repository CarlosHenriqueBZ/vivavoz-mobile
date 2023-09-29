import {Model, Query} from '@nozbe/watermelondb';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Associations} from '@nozbe/watermelondb/Model';
import {readonly, date, field, children, } from '@nozbe/watermelondb/decorators';
import City from './City';

export default class Company extends Model {
  static table = 'companies';

  static associations: Associations = {
    cities: {type: 'has_many', foreignKey: 'company_id'},
  };

  @field('nome_fantasia')
  nomeFantasia!: string;

  @children('cities')
  cities!: Query<City>;

  @date('created_at')
  createdAt!: number;

  @date('updated_at')
  updatedAt!: number;
}
