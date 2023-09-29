import Complaint from '../data/models/Complaint';
import Database from '@nozbe/watermelondb/Database';
import {v4 as uuid} from 'uuid';
import {CreateComplaintRepositoryDTO} from '../dtos/ComplaintsRepositoryDTO';

export interface IComplaintsRepository {
  create(data: CreateComplaintRepositoryDTO): Promise<any>;
  getAllComplaints(): Promise<any>;
}

export default class ComplaintsRepository implements IComplaintsRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async create({
    id,
    type,
    status,
    company,
    city,
    syndicate,
    state,
    gotCovid,
    gotCovidMore,
    whereGotCovid,
    howManyGotCovid,
    covidRisk,
    iscovid,
    worker,
  }: CreateComplaintRepositoryDTO): Promise<any> {
    const createdComplaint = await this.database.write<Complaint>(async () => {
      const newComplaint = await this.database.collections
        .get<Complaint>('complaints')
        .create(complaint => {
          complaint._raw.id = id ? id : uuid();
          complaint.status = status;
          complaint.type = type;
          complaint.companyId = company;
          complaint.cityId = city;
          complaint.syndicateId = syndicate;
          complaint.state = state;
          complaint.gotCovid = gotCovid!;
          complaint.gotCovidMore = gotCovidMore!;
          complaint.whereGotCovid = this.parseArray(whereGotCovid!);
          complaint.howManyGotCovid = howManyGotCovid!;
          complaint.covidRisk = this.parseArray(covidRisk!);
          complaint.isCovid = iscovid!;
          complaint.workerId = worker!;
        });

      return newComplaint;
    });

    return createdComplaint;
  }

  async update(data: Partial<Complaint>): Promise<Complaint>{
    const { id, ...rest } = data;
    const complaint = await this.database.write<Complaint>(async () => {
      if(!id){
        throw new Error('Id is required');
      }
      const complaint = await this.database.get<Complaint>('complaints').find(id);
      return await complaint.update((loadedComplaint)=>{
        Object.assign(loadedComplaint, rest);
      });
    })

    return complaint;
  }

  parseArray(array: number[]) {
    let result = '';

    if (array) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (index == array.length - 1) {
          result = result + element.toString();
        } else {
          result = result + element.toString() + ', ';
        }
      }
    }

    return result;
  }

  async findById(complaintId: string): Promise<Complaint> {
    const complaint = await this.database.read<Complaint>(async () => {
      return await this.database.get<Complaint>('complaints').find(complaintId);
    });

    return complaint;
  }

  async getAllComplaints(): Promise<any> {
    const getAllComplaints = await this.database.read(async () => {
      return await this.database.get<Complaint>('complaints').query().fetch();
    });

    return getAllComplaints;
  }
}
