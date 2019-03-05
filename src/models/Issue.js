import mongoose, { Schema } from 'mongoose';

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: true,
    },
    description: {
      type: String,
    },
    assignedTo: {
      type: String,
    },
    status: {
      type: String,
      default: 'Un-assigned',
      required: true,
    },
    imageSrc: {
      type: [String],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Issue', IssueSchema);
