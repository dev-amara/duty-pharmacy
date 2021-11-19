import { Document } from 'mongoose';

export interface Insurance extends Document {
  readonly label: string;
}
