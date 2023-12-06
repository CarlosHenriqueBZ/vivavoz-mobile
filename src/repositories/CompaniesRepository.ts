import Company from '../data/models/Company';
import Database from '@nozbe/watermelondb/Database';
import { ICreateCompanyDTO } from '../dtos/CompaniesDTO';

export interface ICompaniesInterface {
  create(data: any): Promise<any>;
  getAll(): Promise<any>;
  getCities(id: string): Promise<any>;
}

export default class CompaniesRepository implements ICompaniesInterface {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async create(data: ICreateCompanyDTO): Promise<any> {
    const createdCompany = await this.database.write<Company>(async () => {
      const newCompany = await this.database.collections
        .get<Company>('companies')
        .create((company) => {
          company._raw.id = data.id;
          company.nomeFantasia = data.nome_fantasia;
          company.createdAt = data.created_at;
          company.updatedAt = data.updated_at;
          company.state = data.state;
        });

      return newCompany;
    });

    return createdCompany;
  }

  async getAll(): Promise<any>{
    const getAllCompanies = await this.database.read( async ()=>{
      const companies = await this.database.collections.get<Company>('companies').query().fetch();
      return companies;
    });

    return getAllCompanies;
  }

  async getCities(id: string): Promise<any>{
    const getAllCities = await this.database.read( async ()=>{
      const cities = await (await this.database.collections.get<Company>('companies').find(id)).cities.fetch()
      return cities;
    });

    return getAllCities;
  };
}
