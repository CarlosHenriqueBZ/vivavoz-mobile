// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Complaint from '../data/models/Complaint';

export interface CreateMessageDTO {
  keyFromMe: string; //income or outgoing,
  status: number; // 1 received, 2 waiting on the server, 3, received on destination,
  needPush: number;
  messageType: string; //text, image, audio, video,
  data?: string; //content of the message
  mediaUrl?: string;
  mediaMimeType?: string;
  mediaSize?: number | null;
  mediaDuration?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  thumbImage?: string;
  complaint: Complaint;
}

// {name: 'key_from_me', type: 'string'}, //income or outgoing
// {name: 'status', type: 'number'}, // received, waiting on the server, received on destination
// {name: 'need_push', type: 'number'}, //2 broadcast message 0 otherwise
// {name: 'message_type', type: 'string'}, //text, image, audio, video
// {name: 'data', type: 'string', isOptional: true}, //content if message_type is 0
// {name: 'media_url', type: 'string', isOptional: true},
// {name: 'media_mime_type', type: 'string', isOptional: true},
// {name: 'media_size', type: 'number', isOptional: true},
// {name: 'media_duration', type: 'number', isOptional: true},
// {name: 'latitude', type: 'number', isOptional: true},
// {name: 'longitude', type: 'number', isOptional: true},
// {name: 'thumb_image', type: 'string', isOptional: true},
// {name: 'created_at', type: 'number'},
// {name: 'complaint_id', type: 'string', isIndexed: true},
