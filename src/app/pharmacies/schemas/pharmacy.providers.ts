import { Connection } from 'mongoose';
import { PharmacySchema } from './pharmacy.schema';

export const pharmaciesProviders = [
  {
    provide: 'PHARMACY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Pharmacy', PharmacySchema),
    inject: ['MONGOOSE_CONNECTION'],
  },
];
