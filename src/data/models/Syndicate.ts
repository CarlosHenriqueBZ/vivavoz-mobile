import {Model} from '@nozbe/watermelondb';
import {field, date, readonly} from '@nozbe/watermelondb/decorators';

export default class Syndicate extends Model {
  static table = 'unions';

  @field('nome_fantasia')
  nomeFantasia!: string;

  @field('discount_percentage')
  discountPercentage!: number;

  @field('state')
  state!: string;

  @field('type')
  type!: string;

  @readonly
  @date('created_at')
  createdAt!: number;

  @readonly
  @date('updated_at')
  updatedAt!: number;
}
