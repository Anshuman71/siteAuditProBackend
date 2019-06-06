import mongoose, { Schema } from 'mongoose';

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Company', CompanySchema);
