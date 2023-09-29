import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 9,
  tables: [
    tableSchema({
      name: 'sms_notifications',
      columns: [
        {name: 'phone', type: 'string'},
        {name: 'complaint_id', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'companies',
      columns: [
        {name: 'nome_fantasia', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'cities',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'company_id', type: 'string', isIndexed: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'unions',
      columns: [
        {name: 'nome_fantasia', type: 'string'},
        {name: 'discount_percentage', type: 'number'},
        {name: 'state', type: 'string'},
        {name: 'type', type: 'string', isOptional: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'complaints',
      columns: [
        {name: 'protocol', type: 'string', isOptional: true},
        {name: 'status', type: 'number'}, // 1 Enviado, 2 em analise, 3 finalizado
        {name: 'unseen_msg_count', type: 'number', isOptional: true},
        {name: 'priority', type: 'number', isOptional: true},
        {name: 'company_id', type: 'string'},
        {name: 'state', type: 'string', isOptional: true},
        {name: 'city_id', type: 'string'},
        {name: 'worker_id', type: 'string', isOptional: true},
        {name: 'syndicate_id', type: 'string'},
        {name: 'updated_at', type: 'number'},
        {name: 'created_at', type: 'number'},
        {name: 'type', type: 'string', isOptional: true},
        {name: 'server_created_at', type: 'number', isOptional: true},
        {name: 'iscovid', type: 'boolean', isOptional: true},
        {name: 'got_covid', type: 'string', isOptional: true},
        {name: 'got_covid_more', type: 'string', isOptional: true},
        {name: 'where_got_covid', type: 'string', isOptional: true},
        {name: 'how_many_got_covid', type: 'string', isOptional: true},
        {name: 'covid_risk', type: 'string', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        {name: 'key_from_me', type: 'string'}, //income or outgoing
        {name: 'status', type: 'number'}, // received, waiting on the server, received on destination
        {name: 'need_push', type: 'number'}, //2 broadcast message 0 otherwise
        {name: 'message_type', type: 'string'}, //text, image, audio, video, document
        {name: 'data', type: 'string', isOptional: true}, //content if message_type is 0
        {name: 'media_url', type: 'string', isOptional: true},
        {name: 'media_mime_type', type: 'string', isOptional: true},
        {name: 'media_size', type: 'number', isOptional: true},
        {name: 'media_duration', type: 'number', isOptional: true},
        {name: 'latitude', type: 'number', isOptional: true},
        {name: 'longitude', type: 'number', isOptional: true},
        {name: 'thumb_image', type: 'string', isOptional: true},
        {name: 'updated_at', type: 'number'},
        {name: 'created_at', type: 'number'},
        {name: 'complaint_id', type: 'string', isIndexed: true},
        {name: 'server_created_at', type: 'number', isOptional: true},
      ],
    }),
  ],
});
