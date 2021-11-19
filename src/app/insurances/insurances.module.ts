import { Module } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { InsurancesController } from './insurances.controller';
import { MongooseModule } from '../../utils/mongoose/mongoose.module';
import { insurancesProviders } from './schemas/insurances.providers';

@Module({
  imports: [MongooseModule],
  controllers: [InsurancesController],
  providers: [InsurancesService, ...insurancesProviders],
  exports: [InsurancesService, ...insurancesProviders],
})
export class InsurancesModule {}
