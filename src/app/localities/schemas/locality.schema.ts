import * as mongoose from 'mongoose';
import { PharmacySchema } from '../../pharmacies/schemas/pharmacy.schema';

export const LocalitySchema = new mongoose.Schema(
  {
    commune: String,
    pharmacies: [PharmacySchema],
  },
  {
    _id: true,
  },
);
