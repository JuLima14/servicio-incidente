var config = {};

config.databaseConfig = {};

//config.databaseConfig.DATABASE_URL = "postgres://twlfziyretvaol:e47476a474996d6288a1cedf20448b60e1352f27783af0d506d2d589746805c2@ec2-54-235-112-37.compute-1.amazonaws.com:5432/d7t6cddl7ofpsl?ssl=true";
config.databaseConfig.DATABASE_URL ="postgres://twlfziyretvaol:e47476a474996d6288a1cedf20448b60e1352f27783af0d506d2d589746805c2@ec2-54-235-112-37.compute-1.amazonaws.com:5432/d7t6cddl7ofpsl";
config.databaseConfig.poolIdleTimeout = 600000;
config.databaseConfig.ssl = true;

config.PORT = process.env.PORT || 8080;

module.exports = config;
