import mongoose, { Mongoose } from 'mongoose';
import config from '.';

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!config.database_url) throw new Error('Missing MONGODB_URL');

  cached.promise =
    cached.promise ||
    mongoose.connect(config.database_url, {
      dbName: 'university-management-system',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  console.log('Connected to MongoDB', cached.conn?.Connection);

  return cached.conn;
};

export default connectDB;
