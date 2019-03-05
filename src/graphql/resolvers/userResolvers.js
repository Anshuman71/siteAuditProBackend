import { AuthenticationError, ValidationError } from 'apollo-server';

import User from '../../models/User';
import { requireAuth } from '../../services/auth';
import constants from '../../config/constants';

export default {
  login: async (_, user) => {
    try {
      let newUser = await User.findById({ email: user.email });
      // if no such user exists, create one
      if (!newUser) {
        newUser = await User.create(user);
      }
      console.log('user-made', { newUser });
      // Create JWT token
      const token = newUser.createToken();
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
