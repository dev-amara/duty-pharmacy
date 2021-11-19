import { Inject, Injectable } from '@nestjs/common';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { Model } from 'mongoose';
import { Pharmacy } from './dto/pharmacy.interface';

@Injectable()
export class PharmaciesService {
  constructor(
    @Inject('PHARMACY_MODEL')
    private pharmacyModel: Model<Pharmacy>,
  ) {}

  create(CreatePharmacyDto: CreatePharmacyDto) {
    const createLocality = new this.pharmacyModel(CreatePharmacyDto);
    return createLocality.save();
  }

  async deleteMany() {
    return this.pharmacyModel.deleteMany();
  }

  async findAll() {
    return this.pharmacyModel.find().exec();
  }

  async findOne(id: string) {
    return this.pharmacyModel.findById(id).exec();
  }

  async update(id: string, UpdatePharmacyDto: UpdatePharmacyDto) {
    return this.pharmacyModel.findByIdAndUpdate(id, UpdatePharmacyDto).exec();
  }

  async remove(id: string) {
    return this.pharmacyModel.findByIdAndRemove(id).exec();
  }
}
