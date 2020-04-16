require('dotenv').config({ path: __dirname + '/.env' });
const redis = require('redis');

module.exports = {
  run: function() {
    return new Promise(function(resolve, reject) {
      let redisClient = null;

      try {
        redisClient = redis.createClient({
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: process.env.REDIS_PORT || 6379,
          db: process.env.REDIS_DB || 0,
        });
 
        redisClient.on('error', function (err) {
          console.log(err);
          reject(null);
        });

        redisClient.llen(process.env.REDIS_KEY, function(err, length) {
          if (err) {
            console.log(err);
            reject(null);
            return;
          }

          resolve(length);
        });
      } catch (e) {
        console.log(e);
	      reject(null);
      } finally {
        if (redisClient && redisClient.connected) {
          redisClient.end(true);
        }
      }
    });
  }
}
