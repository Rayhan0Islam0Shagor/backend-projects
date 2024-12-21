import { Schema, model, models } from 'mongoose';

// Define Counter Schema
const counterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const CounterModel = models.Counter || model('Counter', counterSchema);

export default CounterModel;

export const generateId = async (name: string): Promise<string> => {
  const counter = await CounterModel.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  return `${name?.substring(0, 3)?.toUpperCase()}-${counter.seq}`;
};
