import { ApiProperty } from '@nestjs/swagger';

export class CreatePharmacyDto {
  @ApiProperty()
  label: string;

  @ApiProperty()
  director: string;

  @ApiProperty()
  tel: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  long: string;

  @ApiProperty()
  lat: string;

  @ApiProperty()
  dateStart: string;

  @ApiProperty()
  dateEnd: string;

  @ApiProperty()
  locality_id: string;
}
