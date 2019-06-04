import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    deadLine: {
      type: Date,
    },
    // TODO: use `populate` while query
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Issue',
        required: true,
      },
    ],
    images: {
      type: [String],
      default: [],
    },
    auditorCompany: {
      type: String,
      required: true,
    },
    auditorName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Project', ProjectSchema);
