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
    gender: String!
    FCMToken:String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    email: String!
    userName: String!
    gender: String!
    avatar: String
    FCMToken:String
    createdAt: Date!
    updatedAt: Date!
  }

  type Issue {
    _id: ID!
    title: String!
    projectId: String!
    description: String
    assignedTo: String
    status: String
    imageSrc: [String]
    createdAt: Date!
    updatedAt: Date!
  }

  type Stats {
    projects: Int
    unAssigned:Int
    fixed:Int
    assigned:Int
  }

  type Project {
    _id: ID!
    title: String!
    client: String!
    auditorCompany: String!
    location: String!
    auditorName: String!
    user: User
    createdAt: Date!
    updatedAt: Date!

  }
  type Query {
    getIssueById(_id: ID!): Issue
    getIssuesByProjectId(_id:ID!): [Issue]
    getProjectsByUser: [Project]
    getProjectById(_id:ID): Project
    stats: Stats
    me: Me
  }

  type Mutation {
    createIssue(title: String!, projectId: String!, description:String, assignedTo:String, status:String,imageSrc: [String]): Issue
    deleteIssue(_id: ID!): Status
    updateIssue(_id: ID!,title: String, description:String, assignedTo:String, status:String,imageSrc: [String]): Issue
    createProject(title: String!, client: String!, auditorCompany: String!, auditorName: String!, location: String!): Project
    deleteProject(_id: ID!): Status
    updateProject(_id: ID!,title: String, client: String, auditorCompany:String, auditorName:String, location:String): Project
    login(email: String!, userName: String!, FCMToken: String, gender: String!, avatar: String): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
