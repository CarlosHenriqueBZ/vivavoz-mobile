import SMSNotification from '../data/models/SMSNotification';
import Database from '@nozbe/watermelondb/Database';

interface ISMSNotificationRepository {
  create(data: any): Promise<any>;
}

interface ICreateSMSNotificationDTO {
  phone: string;
  complaint_id: string;
}

export default class SMSNotificationRepository implements ISMSNotificationRepository {
  private database: Database;

  constructor(database: Database){
    this.database = database;
  }

  public async create({phone, complaint_id}: ICreateSMSNotificationDTO): Promise<any>{
    const createdNotification = await this.database.write<SMSNotification>(async ()=>{
      const notification = await this.database.collections
                                      .get<SMSNotification>('sms_notifications')
                                      .create((notification)=>{
                                        notification.phone = phone;
                                        notification.complaint_id = complaint_id;
                                      });

      return notification;
    });

    return createdNotification;
  }
}
