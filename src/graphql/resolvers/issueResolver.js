import { UserInputError } from 'apollo-server';
import Issue from '../../models/Issue';
import { requireAuth } from '../../services/auth';

export default {
  getIssues: async (_, {}) => {
    try {
      const Issues = await Issue.find();
      return Issues;
    } catch (error) {
      throw new Error("couldn't get Issues for you");
    }
  },
  getIssue: async (_, { _id }) => {
    try {
      const Issue = await Issue.findById(_id);
      return Issue;
    } catch (error) {
      throw new Error('problem finding Issue!');
    }
  },
  getProjectIssues: async (_, {projectId}, { user }) => {
    try {
      await requireAuth(user);
      const Issues = await Issue.find({ project: projectId });
      return Issues;
    } catch (error) {
      console.log('get project Issues', { user }, { error });

      throw new Error('problem finding Issues!');
    }
  },
  createIssue: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);
      const Issue = await Issue.create(args);
      return Issue;
    } catch (error) {
      console.log('create Issue', { user }, { error });
      throw new Error('oops the Issue fall of the stack!');
    }
  },
  updateIssue: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const Issue = await Issue.findById({ _id });
      if (!Issue) {
        throw new UserInputError('requested Issue not found!');
      }
      Object.entries(rest).forEach(([key, value]) => {
        Issue[key] = value;
      });
      return Issue.save();
    } catch (error) {
      throw error;
    }
  },
  deleteIssue: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const Issue = await Issue.findById({ _id });

      if (!Issue) {
        throw new UserInputError('requested Issue not found!');
      }
      await Issue.remove();
      return { message: 'Delete Success!' };
    } catch (error) {
      console.log('delete', { user }, { error });
      throw new Error("couldn't get the Issue off stack!");
    }
  },
};
