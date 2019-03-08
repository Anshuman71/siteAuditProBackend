import { AuthenticationError, ValidationError } from 'apollo-server';

import User from '../../models/User';
import Project from '../../models/Project';
import Issue from '../../models/Issue';
import { requireAuth } from '../../services/auth';

export default {
  login: async (_, user) => {
    try {
      let newUser = await User.findOne({ email: user.email });
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
  stats: async (_, args, { user }) => {
    try {
      const Projects = await Project.find({ user: user._id });
      const issueStats = { unAssigned: 0, fixed: 0, assigned: 0 };
      if (Projects.length) {
        Projects.forEach(async (item) => {
          const issues = await Issue.find({ project: item._id });
          if (issues) {
            for (let i = 0; i < issues.length; i++) {
              if (issues[i].status === 'Un-assigned') {
                issueStats.unAssigned += 1;
              } else if (issues[i].status === 'Fixed') {
                issueStats.fixed += 1;
              } else {
                issueStats.assigned += 1;
              }
            }
          }
        });
      }
      return { projects: Projects.length || 0, ...issueStats };
    } catch (error) {
      return new AuthenticationError("couldn't recognize you!");
    }
  },
  // updateMe: async (_, args, { user }) => {
  //   try {
  //     const me = await requireAuth(user);
  //     Object.entries(args).forEach(([key, value]) => {
  //       me[key] = value;
  //     });
  //     return me.save();
  //   } catch (error) {
  //     return new Error("couldn't update details!");
  //   }
  // },
};
