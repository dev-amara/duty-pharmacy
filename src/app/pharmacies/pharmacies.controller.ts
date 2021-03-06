import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pharmacies')
@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService) {}

  @Post()
  create(@Body() createPharmacyDto: CreatePharmacyDto) {
    return this.pharmaciesService.create(createPharmacyDto);
  }

  @Get()
  findAll() {
    return this.pharmaciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmaciesService.findOne(id);
  }

  @Get('locality/:localityId')
  findByLocalityId(@Param('localityId') localityId: string) {
    return this.pharmaciesService.findByLocalityId(localityId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePharmacyDto: UpdatePharmacyDto,
  ) {
    return this.pharmaciesService.update(id, updatePharmacyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmaciesService.remove(id);
  }
}
