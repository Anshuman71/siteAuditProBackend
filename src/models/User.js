import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import constants from '../config/constants';

const PLANS = ['BASIC', 'PRO', 'PRIME'];

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    profilePic: String,
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: PLANS,
      default: PLANS[0],
    },
    FCMToken: String,
  },
  { timestamps: true },
);

UserSchema.methods = {
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET,
    );
  },
};

export default mongoose.model('User', UserSchema);
