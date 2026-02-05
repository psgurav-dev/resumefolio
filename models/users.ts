import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    appwriteUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    name: {
      type: String,
    },

    provider: {
      type: String,
      enum: ['google', 'github', 'email'],
      default: 'google',
    },
  },
  { timestamps: true },
);

export default mongoose.models.users || mongoose.model('users', UserSchema);
