import { Connection } from 'mongoose';
import { InsuranceSchema } from './insurance.schema';

export const insurancesProviders = [
  {
    provide: 'INSURANCE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Insurance', InsuranceSchema),
    inject: ['MONGOOSE_CONNECTION'],
  },
];
