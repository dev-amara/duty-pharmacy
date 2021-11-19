import { Document } from 'mongoose';

export interface Pharmacy extends Document {
  readonly commune: string;
  readonly label: string;
  readonly director: string;
  readonly tel: string;
  readonly long: string;
  readonly lat: string;
  readonly location: string;
  readonly dateStart: string;
  readonly dateEnd: string;
}
