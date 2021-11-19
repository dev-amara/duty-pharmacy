import { Inject, Injectable } from '@nestjs/common';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import { Model } from 'mongoose';
import { Insurance } from './dto/insurance.interface';

@Injectable()
export class InsurancesService {
  constructor(
    @Inject('INSURANCE_MODEL')
    private insuranceModel: Model<Insurance>,
  ) {}

  async create(createInsuranceDto: CreateInsuranceDto): Promise<Insurance> {
    const createInsurance = new this.insuranceModel(createInsuranceDto);
    return createInsurance.save();
  }

  async findAll(): Promise<Insurance[]> {
    return this.insuranceModel.find().exec();
  }

  async findOne(id: string) {
    return this.insuranceModel.findById(id).exec();
  }

  async update(id: string, updateInsuranceDto: UpdateInsuranceDto) {
    return this.insuranceModel.findByIdAndUpdate(id, updateInsuranceDto).exec();
  }

  async remove(id: string): Promise<any> {
    return this.insuranceModel.findByIdAndRemove(id).exec();
  }
}
