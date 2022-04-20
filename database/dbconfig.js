module.exports = {
  host: process.env.db_server,
  user: process.env.user,
  password: process.env.password,
  database: process.env.db,
  connectionLimit: 10,
  multipleStatements: false,
};
