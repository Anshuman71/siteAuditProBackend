import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    auditorCompany:{
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
    user:{
      type: Schema.Types.ObjectId,
      ref:'User'      
    }
  },
  { timestamps: true },
);

export default mongoose.model('Project', ProjectSchema);
