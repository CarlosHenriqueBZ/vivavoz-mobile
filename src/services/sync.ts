import {synchronize, SyncPullResult} from '@nozbe/watermelondb/sync';
import {Platform} from 'react-native';
import {database} from '../data/database';
import Qs from 'qs';

import api from '../services/api';
import ComplaintsRepository from '../repositories/ComplaintsRepository';
import Complaint from '../data/models/Complaint';

export async function sync(complaints?: string[]) {
  const complaintsRepository = new ComplaintsRepository(database);
  const allComplaints = await complaintsRepository.getAllComplaints();

  const observedComplaints = allComplaints.map(
    (complaint: Complaint) => complaint.id,
  );

  try{
    await synchronize({
      database,
      pullChanges: async ({lastPulledAt}) => {
        const response = await api.get('/sync', {
          params: {
            last_pulled_at: lastPulledAt || 0,
            complaints: observedComplaints,
          },
          paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'brackets'});
          },
        });

        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        const data: SyncPullResult = response.data;

        return data;
      },

      pushChanges: async ({changes, lastPulledAt}) => {
        const response = await api.post(
          `/sync?last_pulled_at=${lastPulledAt}`,
          changes,
        );

        if (response.status !== 204) {
          throw new Error(response.statusText);
        }

        const {messages} = changes;
        messages.created.map(async (message: any) => {
          if (message.message_type !== 'text') {
            const fileExtension = message.media_url.split('.').pop();

            const data = new FormData();
            data.append('media', {
              type: message.media_mime_type,
              name: `${Date.now()}.${fileExtension}`,
              uri:
                Platform.OS === 'android'
                  ? `file://${message.media_url}`
                  : message.media_url,
              extension: fileExtension,
            });
            data.append('id', message.id);

            await api.post('/sync/media', data);
          }
        });
      },
    });
  } catch (error) {
    if(error instanceof Error){
      console.error(`Error: ${error.stack}`);
    }
  }

}
