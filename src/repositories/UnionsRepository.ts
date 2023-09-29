import Syndicate from '../data/models/Syndicate';
import Database from '@nozbe/watermelondb/Database';
import { Q } from '@nozbe/watermelondb'
import { Clause } from '@nozbe/watermelondb/QueryDescription'

interface IListUnions {
  state?: string;
  type?: string;
}

interface IUnionsRepository{
  getAll(data?: IListUnions): Promise<Syndicate[]>;
}

export default class UnionsRepository implements IUnionsRepository{
  private database: Database;

  constructor(database: Database){
    this.database = database;
  }

  public async getAll(data?: IListUnions):Promise<Syndicate[]>{
    const conditions: Clause[] = [];

    if(data?.state){
      conditions.push(Q.where('state', data.state));
    }

    if(data?.type){
      conditions.push(Q.where('type', data.type));
    }

    return await this.database.read(async ()=>{
      return await this.database.collections.get<Syndicate>('unions').query(...conditions).fetch();
    });
  }
}
