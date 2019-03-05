import { UserInputError } from 'apollo-server';
import Project from '../../models/Project';
import { requireAuth } from '../../services/auth';

export default {
  getAllProjects: async (_) => {
    try {
      const Projects = await Project.find();
      return Projects;
    } catch (error) {
      throw new Error("couldn't get Projects for you");
    }
  },
  getProjectById: async (_, { _id }) => {
    try {
      const project = await Project.findById(_id);
      return project;
    } catch (error) {
      throw new Error('problem finding Project!');
    }
  },
  getProjectsByUser: async (_, {}, { user }) => {
    try {
      await requireAuth(user);
      const Projects = await Project.find({ user: user._id });
      return Projects;
    } catch (error) {
      console.log('get project Projects', { user }, { error });

      throw new Error('problem finding Projects!');
    }
  },
  createProject: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);
      const project = await Project.create({ ...args, user: me._id });
      return project;
    } catch (error) {
      console.log('create Project', { user }, { error });
      throw new Error('oops the Project fall of the stack!');
    }
  },
  updateProject: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const project = await Project.findById({ _id });
      if (!project) {
        throw new UserInputError('requested project not found!');
      }
      Object.entries(rest).forEach(([key, value]) => {
        project[key] = value;
      });
      return project.save();
    } catch (error) {
      throw error;
    }
  },
  deleteProject: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const project = await Project.findById({ _id });

      if (!project) {
        throw new UserInputError('requested project not found!');
      }
      await project.remove();
      return { message: 'Delete Success!' };
    } catch (error) {
      console.log('delete', { user }, { error });
      throw new Error("couldn't get the Project off stack!");
    }
  },
};
