import { Connection } from 'mongoose';
import { LocalitySchema } from './locality.schema';

export const localitiesProviders = [
  {
    provide: 'LOCALITY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Locality', LocalitySchema),
    inject: ['MONGOOSE_CONNECTION'],
  },
];
