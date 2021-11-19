import * as mongoose from 'mongoose';

export const PharmacySchema = new mongoose.Schema({
  label: String,
  director: String,
  tel: String,
  location: String,
  long: String,
  lat: String,
  dateStart: String,
  dateEnd: String,
});
