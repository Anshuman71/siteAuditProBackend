import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type Status {
    message: String!
  }

  type Auth {
    token: String
  }

  enum Plan {
    BASIC
    PRO
    PRIME
  }

  type User {
    _id: ID!
    userName: String!
    profilePic: String
    email: String!
    plan: Plan
    FCMToken: String
    createdAt: Date!
    updatedAt: Date!
  }

  enum STATUS {
    TODO
    DONE
    LATE
    ASSIGNED
    UNASSIGNED
  }

  type Issue {
    _id: ID!
    title: String!
    projectId: Project!
    comment: String
    assignee: String
    status: STATUS
    imageSrc: [String]
    createdAt: Date!
    updatedAt: Date!
  }

  type Stats {
    projects: Int
    unAssigned: Int
    fixed: Int
    assigned: Int
  }

  type Project {
    _id: ID!
    title: String!
    clientName: String!
    deadLine: Date
    issues: [Issue]
    images: [String]
    auditorCompany: String!
    auditorName: String!
    location: String!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }

  type Company {
    _id: ID!
    name: String!
    logo: String
    location: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    # Comapny
    Company(_id: ID!): Company
    Comapnies: [Company]
    # Issue
    getIssueById(_id: ID!): Issue
    getIssuesByProjectId(_id: ID!): [Issue]
    # Project
    getProjectsByUser: [Project]
    getProjectById(_id: ID): Project
    stats: Stats
    # Me
    me: User
  }

  type Mutation {
    # Comapny
    createCompany(name: String!, logo: String, location: String): Company
    updateCompany(
      _id: ID!
      name: String
      logo: String
      location: String
    ): Company
    deleteCompany(_id: ID!): Status
    # Issue
    createIssue(
      title: String!
      projectId: String!
      comment: String
      assignee: String
      status: STATUS
      imageSrc: [String]
    ): Issue
    deleteIssue(_id: ID!): Status
    updateIssue(
      _id: ID!
      title: String
      comment: String
      assignee: String
      status: STATUS
      imageSrc: [String]
    ): Issue
    # Project
    createProject(
      title: String!
      clientName: String!
      deadLine: Date
      issues: [String]
      images: [String]
      auditorCompany: String!
      auditorName: String!
      location: String!
    ): Project
    deleteProject(_id: ID!): Status
    updateProject(
      _id: ID!
      title: String
      client: String
      auditorCompany: String
      auditorName: String
      location: String
    ): Project
    # Me
    login(
      email: String!
      userName: String!
      FCMToken: String
      profilePic: String
    ): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
export default typeDefs;
