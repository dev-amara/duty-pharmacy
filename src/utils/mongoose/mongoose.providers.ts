import * as mongoose from 'mongoose';

export const mongooseProviders = [
  {
    provide: 'MONGOOSE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      // mongoose.connect('mongodb://localhost/nest'),
      mongoose.connect(
        `mongodb+srv://user:user@cluster0.zkvaf.mongodb.net/duty_pharmacies
?retryWrites=true&w=majority`,
      ),
  },
];
