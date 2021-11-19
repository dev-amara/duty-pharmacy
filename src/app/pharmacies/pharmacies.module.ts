import { Module } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { PharmaciesController } from './pharmacies.controller';
import { pharmaciesProviders } from './schemas/pharmacy.providers';
import { MongooseModule } from '../../utils/mongoose/mongoose.module';

@Module({
  imports: [MongooseModule],
  controllers: [PharmaciesController],
  providers: [PharmaciesService, ...pharmaciesProviders],
  exports: [PharmaciesService, ...pharmaciesProviders],
})
export class PharmaciesModule {}
