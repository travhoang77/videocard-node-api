let config = {
  dbUrl: process.env.DBURL,
  port: process.env.PORT,
  secret: process.env.SECRET,
  env: process.env.NODE_ENV,
  logDir: process.env.LOGDIR || "logs",
  viewEngine: process.env.VIEW_ENGINE || "html",
};

module.exports = config;
