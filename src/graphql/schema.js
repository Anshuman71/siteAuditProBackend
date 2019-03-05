export default `
  scalar Date

  type Status {
    message: String!
  }

  type Auth {
    token: String
  }

  type User {
    _id: ID!
    email: String!
    userName: String!
    FCMToken:String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    email: String!
    userName: String!
    avatar: String
    FCMToken:String
    createdAt: Date!
    updatedAt: Date!
  }

  type Issue {
    _id: ID!
    title: String!
    project: String!
    description: String
    assignedTo: String
    status: String
    imageSrc: [String]
    createdAt: Date!
    updatedAt: Date!
  }

  type Project {
    _id: ID!
    title: String!
    client: String!
    auditorCompany: String!
    auditorName: String
    location: String!
    user: User
    createdAt: Date!
    updatedAt: Date!

  }
  type Query {
    getIssueById(_id: ID!): Issue
    getIssuesByProject: [Issue]
    getProjectsByUser: [Project]
    me: Me
  }

  type Mutation {
    createIssue(title: String!, project: String!, description:String, assignedTo:String, status:String,imageSrc: [String]): Issue
    deleteIssue(_id: ID!): Status
    updateIssue(_id: ID!,title: String, project: String, description:String, assignedTo:String, status:String,imageSrc: [String]): Issue
    createProject(title: String!, client: String!, auditorCompany:String, auditorName:String, location:String,user:User): Project
    deleteProject(_id: ID!): Status
    updateProject(_id: ID!,title: String, client: String, auditorCompany:String, auditorName:String, location:String): Project
    signup(email: String!, userName: String!,FCMToken:String, avatar: String): Auth
    updateMe(avatar: String,token:String): Me
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
