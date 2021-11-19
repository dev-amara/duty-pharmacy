import { Pharmacy } from '../../pharmacies/dto/pharmacy.interface';

export class CreateLocalityDto {
  commune: string;
  pharmacies: Pharmacy[];
}
