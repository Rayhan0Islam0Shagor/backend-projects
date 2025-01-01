import { Schema, model, models } from 'mongoose';

// Define Counter Schema
const counterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const CounterModel = models.Counter || model('Counter', counterSchema);

export default CounterModel;

export const generateId = async (name: string): Promise<string> => {
  // Update the counter for the given name
  const counter = await CounterModel.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Format the sequence number with leading zeros (e.g., 000001)
  const formattedSeq = counter.seq.toString().padStart(6, '0');

  return `${currentYear}${formattedSeq}`;
};
