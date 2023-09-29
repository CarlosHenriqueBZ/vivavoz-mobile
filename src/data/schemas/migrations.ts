import {
  addColumns,
  createTable,
  schemaMigrations,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 9,
      steps: [
        addColumns({
          table: 'complaints',
          columns: [
            {name: 'state', type: 'string', isOptional: true},
            {name: 'worker_id', type: 'string', isOptional: true},
            {name: 'iscovid', type: 'boolean', isOptional: true},
            {name: 'got_covid', type: 'string', isOptional: true},
            {name: 'got_covid_more', type: 'string', isOptional: true},
            {name: 'where_got_covid', type: 'string', isOptional: true},
            {name: 'how_many_got_covid', type: 'string', isOptional: true},
            {name: 'covid_risk', type: 'string', isOptional: true},
          ],
        }),
      ],
    },
    {
      toVersion: 8,
      steps: [
        addColumns({
          table: 'unions',
          columns: [{name: 'type', type: 'string', isOptional: true}],
        }),
      ],
    },
    {
      toVersion: 7,
      steps: [
        addColumns({
          table: 'unions',
          columns: [
            {name: 'discount_percentage', type: 'number'},
            {name: 'state', type: 'string'},
          ],
        }),
      ],
    },
    {
      toVersion: 6,
      steps: [
        createTable({
          name: 'sms_notifications',
          columns: [
            {name: 'phone', type: 'string'},
            {name: 'complaint_id', type: 'string'},
          ],
        }),
      ],
    },
    {
      toVersion: 5,
      steps: [
        createTable({
          name: 'sms_notifications',
          columns: [
            {name: 'phone', type: 'string'},
            {name: 'complaint_id', type: 'string'},
          ],
        }),
      ],
    },
    {
      toVersion: 4,
      steps: [
        addColumns({
          table: 'complaints',
          columns: [{name: 'type', type: 'string', isOptional: true}],
        }),
      ],
    },
    {
      toVersion: 3,
      steps: [
        createTable({
          name: 'companies',
          columns: [
            {name: 'nome_fantasia', type: 'string'},
            {name: 'created_at', type: 'number'},
            {name: 'updated_at', type: 'number'},
          ],
        }),
        createTable({
          name: 'cities',
          columns: [
            {name: 'name', type: 'string'},
            {name: 'company_id', type: 'string', isIndexed: true},
            {name: 'created_at', type: 'number'},
            {name: 'updated_at', type: 'number'},
          ],
        }),
        createTable({
          name: 'unions',
          columns: [
            {name: 'nome_fantasia', type: 'string'},
            {name: 'created_at', type: 'number'},
            {name: 'updated_at', type: 'number'},
          ],
        }),
      ],
    },
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'messages',
          columns: [
            {name: 'server_created_at', type: 'number', isOptional: true},
          ],
        }),
        addColumns({
          table: 'complaints',
          columns: [
            {name: 'server_created_at', type: 'number', isOptional: true},
          ],
        }),
      ],
    },
    // {
    //   toVersion: 1,
    //   steps: [
    //     createTable({
    //       name: 'syndicates',
    //       columns: [
    //         {name: 'name', type: 'string'},
    //         {name: 'created_at', type: 'number'},
    //         {name: 'updated_at', type: 'number'},
    //       ],
    //     }),
    //     createTable({
    //       name: 'companies',
    //       columns: [
    //         {name: 'name', type: 'string'},
    //         {name: 'created_at', type: 'number'},
    //         {name: 'updated_at', type: 'number'},
    //       ],
    //     }),
    //     createTable({
    //       name: 'complaints',
    //       columns: [
    //         {name: 'protocol', type: 'string', isOptional: true},
    //         {name: 'status', type: 'number'},
    //         {name: 'unseen_msg_count', type: 'number', isOptional: true},
    //         {name: 'updated_at', type: 'number'},
    //         {name: 'created_at', type: 'number'},
    //         {name: 'involveds_id', type: 'string'},
    //       ],
    //     }),
    //     createTable({
    //       name: 'messages',
    //       columns: [
    //         {name: 'key_from_me', type: 'string'},
    //         {name: 'status', type: 'number'},
    //         {name: 'need_push', type: 'number'},
    //         {name: 'message_type', type: 'string'},
    //         {name: 'data', type: 'string', isOptional: true},
    //         {name: 'media_url', type: 'string', isOptional: true},
    //         {name: 'media_mime_type', type: 'string', isOptional: true},
    //         {name: 'media_size', type: 'number', isOptional: true},
    //         {name: 'media_duration', type: 'number', isOptional: true},
    //         {name: 'latitude', type: 'number', isOptional: true},
    //         {name: 'longitude', type: 'number', isOptional: true},
    //         {name: 'thumb_image', type: 'string', isOptional: true},
    //         {name: 'created_at', type: 'number'},
    //         {name: 'complaint_id', type: 'string', isIndexed: true},
    //       ],
    //     }),
    //   ],
    // },
  ],
});
