import GraphQLDate from 'graphql-date';

import UserResolvers from './userResolvers';
import ProjectResolvers from './projectResolvers';
import IssueResolvers from './issueResolver';
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Project: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    me: UserResolvers.me,
    getIssueById: IssueResolvers.getIssueById,
    getIssuesByProjectId: IssueResolvers.getIssuesByProjectId,
    getProjectById: ProjectResolvers.getProjectById,
    getProjectsByUser: ProjectResolvers.getProjectsByUser,
  },
  Mutation: {
    createIssue: IssueResolvers.createIssue,
    updateIssue: IssueResolvers.updateIssue,
    deleteIssue: IssueResolvers.deleteIssue,
    createProject: ProjectResolvers.createProject,
    updateProject: ProjectResolvers.updateProject,
    deleteProject: ProjectResolvers.deleteProject,
    login: UserResolvers.login,
    updateMe: UserResolvers.updateMe,
  },
};
