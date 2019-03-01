import { UserInputError } from 'apollo-server';
import Project from '../../models/Project';
import { requireAuth } from '../../services/auth';

export default {
  getProjects: async (_, { }) => {
    try {
      const Projects = await Project.find();
      return Projects;
    } catch (error) {
      throw new Error("couldn't get Projects for you");
    }
  },
  getProject: async (_, { _id }) => {
    try {
      const Project = await Project.findById(_id);
      return Project;
    } catch (error) {
      throw new Error('problem finding Project!');
    }
  },
  getUserProjects: async (_, { }, { user }) => {
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
      const Project = await Project.create({...args, user:me._id});
      return Project;
    } catch (error) {
      console.log('create Project', { user }, { error });
      throw new Error('oops the Project fall of the stack!');
    }
  },
  updateProject: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const Project = await Project.findById({ _id });
      if (!Project) {
        throw new UserInputError('requested Project not found!');
      }
      Object.entries(rest).forEach(([key, value]) => {
        Project[key] = value;
      });
      return Project.save();
    } catch (error) {
      throw error;
    }
  },
  deleteProject: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const Project = await Project.findById({ _id });

      if (!Project) {
        throw new UserInputError('requested Project not found!');
      }
      await Project.remove();
      return { message: 'Delete Success!' };
    } catch (error) {
      console.log('delete', { user }, { error });
      throw new Error("couldn't get the Project off stack!");
    }
  },
};
