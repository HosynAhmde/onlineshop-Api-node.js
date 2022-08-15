const redis = require("redis");
const redisClient = redis.createClient();
redisClient.connect();

redisClient.on("connect", () => console.log("connect to redis"));
redisClient.on("ready", () =>
  console.log("connect to redis and ready to use...")
);
redisClient.on("error", (error) => console.log(error.message));
redisClient.on("end", () => console.log("disconnect from redis"));

module.exports = redisClient;
