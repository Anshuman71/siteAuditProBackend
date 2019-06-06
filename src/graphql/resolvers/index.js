import GraphQLDate from 'graphql-date';

import UserResolvers from './userResolvers';
import ProjectResolvers from './projectResolvers';
import IssueResolvers from './issueResolver';
import CompanyResolvers from './companyResolvers'
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Project: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    me: UserResolvers.me,
    Company: CompanyResolvers.getCompanyById,
    Comapnies: CompanyResolvers.getAllCompanies,
    getIssueById: IssueResolvers.getIssueById,
    getIssuesByProjectId: IssueResolvers.getIssuesByProjectId,
    getProjectById: ProjectResolvers.getProjectById,
    getProjectsByUser: ProjectResolvers.getProjectsByUser,
  },
  Mutation: {
    createCompany: CompanyResolvers.createCompany,
    updateCompany: CompanyResolvers.updateCompany,
    deleteCompany: CompanyResolvers.deleteCompany,
    createIssue: IssueResolvers.createIssue,
    updateIssue: IssueResolvers.updateIssue,
    deleteIssue: IssueResolvers.deleteIssue,
    createProject: ProjectResolvers.createProject,
    updateProject: ProjectResolvers.updateProject,
    deleteProject: ProjectResolvers.deleteProject,
    login: UserResolvers.login,
  },
};
