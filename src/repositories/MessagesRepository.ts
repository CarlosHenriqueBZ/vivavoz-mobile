import {CreateMessageDTO} from '../dtos/MessagesRepositoryDTO';
import Message from '../data/models/Message';
import Database from '@nozbe/watermelondb/Database';
import {Q} from '@nozbe/watermelondb';
import {v4 as uuid} from 'uuid';

export interface IMessagesRepository {
  createMessage(data: CreateMessageDTO): any;
}

export default class MessagesRepository implements IMessagesRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  public async createMessage({
    keyFromMe,
    status,
    needPush,
    messageType,
    data = '',
    mediaUrl = '',
    mediaMimeType = '',
    mediaSize = null,
    mediaDuration = null,
    latitude = null,
    longitude = null,
    thumbImage = '',
    complaint,
  }: CreateMessageDTO) {
    const createdMessage = await this.database.write(async () => {
      const newMessage = await this.database.collections
        .get<Message>('messages')
        .create(message => {
          message._raw.id = uuid();
          message.keyFromMe = keyFromMe;
          message.status = status;
          message.needPush = needPush;
          message.messageType = messageType;
          message.data = data;
          message.mediaUrl = mediaUrl;
          message.mediaMimeType = mediaMimeType;
          message.mediaSize = mediaSize;
          message.mediaDuration = mediaDuration;
          message.latitude = latitude;
          message.longitude = longitude;
          message.thumbImage = thumbImage;
          message.complaint.set(complaint);
        });

      return newMessage;
    });

    return createdMessage;
  }

  async getAllMessages(complaintId: string): Promise<Message[]> {
    const getAllMessages = await this.database.read<Message[]>(async () => {
      return await this.database.collections
        .get<Message>('messages')
        .query(
          Q.where('complaint_id', Q.eq(complaintId)),
          Q.sortBy('created_at', Q.desc),
        )
        .fetch();
    });

    return getAllMessages;
  }
}
