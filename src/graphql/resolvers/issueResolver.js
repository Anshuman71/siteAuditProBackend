import { UserInputError } from 'apollo-server';
import Issue from '../../models/Issue';
import { requireAuth } from '../../services/auth';

export default {
  getAllIssues: async (_) => {
    try {
      const Issues = await Issue.find();
      return Issues;
    } catch (error) {
      throw new Error("couldn't get Issues for you");
    }
  },
  getIssueById: async (_, { _id }) => {
    try {
      const issue = await Issue.findById(_id);
      return issue;
    } catch (error) {
      throw new Error('problem finding Issue!');
    }
  },
  getIssuesByProjectId: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const Issues = await Issue.find({ projectId: _id });
      return Issues;
    } catch (error) {
      console.log('get project Issues', { user }, { error });
      throw new Error('problem finding Issues!');
    }
  },
  createIssue: async (_, args, { user }) => {
    try {
      const issue = await Issue.create(args);
      return issue;
    } catch (error) {
      console.log('create Issue', { user }, { error });
      throw new Error('oops the Issue fall of the stack!');
    }
  },
  updateIssue: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const issue = await Issue.findById({ _id });
      if (!issue) {
        throw new UserInputError('requested Issue not found!');
      }
      Object.entries(rest).forEach(([key, value]) => {
        issue[key] = value;
      });
      return issue.save();
    } catch (error) {
      throw error;
    }
  },
  deleteIssue: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const issue = await Issue.findById({ _id });

      if (!issue) {
        throw new UserInputError('requested Issue not found!');
      }
      await issue.remove();
      return { message: 'Delete Success!' };
    } catch (error) {
      console.log('delete', { user }, { error });
      throw new Error("couldn't get the Issue off stack!");
    }
  },
};
