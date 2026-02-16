import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL!);
    console.log('MongoDB Connected Successfully.');
  } catch (error) {
    console.log('Something went wrong.', error);
    throw error;
  }
}