import { model as mongooseCreateModel, Schema } from 'mongoose';
import IFrame from '../interfaces/Frame';
import MongoModel from './MongoModel';

// schema para frame usando IFrame
const frameMongooseSchema = new Schema<IFrame>({
  material: String,
  color: String,
});

// classe Frame herdando de MongoModel usando IFrame
class Frame extends MongoModel<IFrame> {
  constructor(model = mongooseCreateModel('Frame', frameMongooseSchema)) {
    super(model);
  }
}

export default Frame;