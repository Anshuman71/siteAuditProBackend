export default {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: '@meow@',
  DB_URL: process.env.MONGO_DB_URI || 'mongodb://localhost/siteAuditpro-dev',
  GRAPHQL_PATH: '/graphql',
};
