import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    file: {
      url: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['pdf', 'docx'],
        required: true,
      },
      originalName: {
        type: String,
      },
    },

    parsingStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },

    parsedData: {
      type: mongoose.Schema.Types.Mixed, // JSON from AI/parser
      default: null,
    },

    parserVersion: {
      type: String,
      default: 'v1',
    },

    error: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Resume', ResumeSchema);
