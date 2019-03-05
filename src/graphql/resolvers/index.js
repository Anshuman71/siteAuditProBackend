import GraphQLDate from 'graphql-date';

import UserResolvers from './userResolvers';
import ProjectResolvers from './projectResolvers';
import IssueResolvers from './issueResolver';
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Issue: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    me: UserResolvers.me,
    getIssueById: IssueResolvers.getIssueById,
    getIssuesByProject: IssueResolvers.getIssuesByProject,
    getProjectById: ProjectResolvers.getProjectById,
    getUserProjects: ProjectResolvers.getUserProjects,
  },
  Mutation: {
    createIssue: IssueResolvers.createIssue,
    updateIssue: IssueResolvers.updateIssue,
    deleteIssue: IssueResolvers.deleteIssue,
    createProject: ProjectResolvers.createProject,
    updateProject: ProjectResolvers.updateProject,
    deleteProject: ProjectResolvers.deleteProject,
    signup: UserResolvers.signup,
    updateMe: UserResolvers.updateMe,
  },
};
