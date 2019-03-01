import {
  AuthenticationError,
  ValidationError,
  UserInputError,
} from 'apollo-server';

import User from '../../models/User';
import { requireAuth } from '../../services/auth';
import { verifyEmail, forgotPassword } from '../../services/email';
import constants from '../../config/constants';

export default {
  signup: async (_, user) => {
    try {
      const oldUser = await User.find({email: user.email });
      //if no such user exists, create one
      if(!oldUser)
        const user = await User.create(user);
      console.log('user-made', { user });
      // Create JWT token
      const token = user.createToken();
      // All done
      return {
        token,
      };
    } catch (error) {
      console.log({ error });
      if (error.name !== 'ValidationError') {
        return new ValidationError('something went wrong!');
      }
      throw error;
    }
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('no user with this email');
    }

    return {
      token: user.createToken(),
    };
  },

  me: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);
      return me;
    } catch (error) {
      return new AuthenticationError("couldn't recognize you!");
    }
  },

  updateMe: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);
      Object.entries(args).forEach(([key, value]) => {
        me[key] = value;
      });
      return me.save();
    } catch (error) {
      return new Error("couldn't update details!");
    }
  },
};
