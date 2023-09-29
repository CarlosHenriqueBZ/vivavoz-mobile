import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import Models from './models';
import schema from './schemas/schema';
import migrations from './schemas/migrations';

const adapter = new SQLiteAdapter({
  dbName: 'vivavoz',
  migrations,
  schema,
});

export const database = new Database({
  adapter,
  modelClasses: Models,
});

// if (__DEV__) {
//   // Import connectDatabases function
//   const connectDatabases = require('react-native-flipper-databases/lib/module')
//     .default;

//   // Import required DBDrivers
//   const WatermelonDBDriver = require('react-native-flipper-databases/lib/module/drivers/watermelondb')
//     .default;

//   connectDatabases([
//     new WatermelonDBDriver(database), // Pass in database definition
//   ]);
// }
