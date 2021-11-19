import { Document } from 'mongoose';

export interface Locality extends Document {
  readonly commune: string;
}
