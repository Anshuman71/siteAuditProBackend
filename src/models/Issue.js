import mongoose, { Schema } from 'mongoose';

const STATUS = ['TODO', 'DONE', 'LATE', 'ASSIGNED', 'UNASSIGNED']

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    comment: {
      type: String,
    },
    assignee: {
      type: String,
      default: 'No one',
    },
    status: {
      type: String,
      enum: STATUS,
      default: 'UNASSIGNED',
    },
    imageSrc: {
      type: [String],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Issue', IssueSchema);
