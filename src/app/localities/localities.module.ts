import { Module } from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { LocalitiesController } from './localities.controller';
import { MongooseModule } from '../../utils/mongoose/mongoose.module';
import { localitiesProviders } from './schemas/localities.providers';

@Module({
  imports: [MongooseModule],
  controllers: [LocalitiesController],
  providers: [LocalitiesService, ...localitiesProviders],
  exports: [LocalitiesService, ...localitiesProviders],
})
export class LocalitiesModule {}
