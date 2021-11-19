import { Inject, Injectable } from '@nestjs/common';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import { Model } from 'mongoose';
import { Locality } from './dto/locality.interface';

@Injectable()
export class LocalitiesService {
  constructor(
    @Inject('LOCALITY_MODEL')
    private localityModel: Model<Locality>,
  ) {}

  create(createLocalityDto: CreateLocalityDto) {
    const createLocality = new this.localityModel(createLocalityDto);
    return createLocality.save();
  }

  async insertMany(createInsuranceDto: CreateLocalityDto[]) {
    return await this.localityModel.insertMany(createInsuranceDto);
  }

  async deleteMany() {
    return this.localityModel.deleteMany();
  }

  async findAll() {
    return this.localityModel.find().exec();
  }

  async findOne(id: string) {
    return this.localityModel.findById(id).exec();
  }

  async update(id: string, updateLocalityDto: UpdateLocalityDto) {
    return this.localityModel.findByIdAndUpdate(id, updateLocalityDto).exec();
  }

  async remove(id: string) {
    return this.localityModel.findByIdAndRemove(id).exec();
  }
}
