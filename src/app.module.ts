import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalitiesModule } from './app/localities/localities.module';
import { PharmaciesModule } from './app/pharmacies/pharmacies.module';
import { InsurancesModule } from './app/insurances/insurances.module';
import { MongooseModule } from './utils/mongoose/mongoose.module';

@Module({
  imports: [
    MongooseModule,
    LocalitiesModule,
    PharmaciesModule,
    InsurancesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
