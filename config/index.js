let config = {
    dbUrl: "mongodb+srv://MRKIMBERLYS:xJEUhe2xk4aAAl22@cluster0.ntqbo.mongodb.net/videocard-dev?retryWrites=true&w=majority" || "mongodb://localhost/test-db",
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    logDir: process.env.LOGDIR || "logs",
    viewEngine: process.env.VIEW_ENGINE || "html"
  };
  
  module.exports = config;