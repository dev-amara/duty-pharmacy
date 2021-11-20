import * as mongoose from 'mongoose';

export const LocalitySchema = new mongoose.Schema({
  commune: String,
});
