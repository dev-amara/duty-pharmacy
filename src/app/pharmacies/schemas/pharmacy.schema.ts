import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const PharmacySchema = new mongoose.Schema({
  label: String,
  director: String,
  tel: String,
  location: String,
  long: String,
  lat: String,
  dateStart: String,
  dateEnd: String,
  locality_id: {
    type: Schema.Types.ObjectId,
    ref: 'Locality',
    required: true,
  },
});
