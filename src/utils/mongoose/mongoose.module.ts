import { Module } from '@nestjs/common';
import { mongooseProviders } from './mongoose.providers';

@Module({
  providers: [...mongooseProviders],
  exports: [...mongooseProviders],
})
export class MongooseModule {}
