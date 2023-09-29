import { synchronize, SyncPullResult } from '@nozbe/watermelondb/sync';
import { database } from '../data/database';
import Qs from 'qs';

import api from '../services/api';

export default async function search(complaint_id: string) {

  let result = {} as SyncPullResult;

  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      const response = await api.get(`/complaints/search/${complaint_id}`, {
        params: {
          lastPulled: lastPulledAt,
        },
        paramsSerializer: (params)=>{
          return Qs.stringify(params, {arrayFormat: 'brackets'})
        }

      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const data: SyncPullResult = response.data;
      result = response.data;

      return data;
    },

    pushChanges: async () => {},
  });

  return result;
}
