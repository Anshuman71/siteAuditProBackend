import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    FCMToken: String,
    avatar: String,
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
