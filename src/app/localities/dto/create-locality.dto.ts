import { ApiProperty } from '@nestjs/swagger';

export class CreateLocalityDto {
  @ApiProperty()
  commune: string;
}
