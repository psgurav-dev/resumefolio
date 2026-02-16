import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    appwriteUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
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

    // feild name for selected-resume
    selectedResume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'resumes',
      null: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.users || mongoose.model('users', UserSchema);
