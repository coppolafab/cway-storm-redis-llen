require('dotenv').config({ path: __dirname + '/.env' });
const redis = require('redis');

module.exports = {
  args: {
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_DB: process.env.REDIS_DB || 0,
    REDIS_KEY_TYPE: process.env.REDIS_KEY_TYPE || 'list',
    REDIS_KEY: process.env.REDIS_KEY
  },
  setArguments: function(args) {
    if (!args) return;

    try {
      this.args = Object.assign(this.args, JSON.parse(args));
    } catch (e) {}
  },
  run: function() {
    const self = this;

    return new Promise(function(resolve, reject) {
      let redisClient = null;

      const fullfillAndClose = function(result) {
        if (result === null) {
          reject(null);
        } else {
          resolve(result);
        }

        if (redisClient && redisClient.connected) {
          redisClient.end(true);
        }
      };

      try {
        redisClient = redis.createClient({
          host: self.args.REDIS_HOST,
          port: self.args.REDIS_PORT,
          db: self.args.REDIS_DB,
          socket_keepalive: false,
          disable_resubscribing: true,
        });
 
        redisClient.on('error', function (err) {
          console.log(err);
          fullfillAndClose(null);
        });

        let lengthFn = null;

        switch (self.args.REDIS_KEY_TYPE) {
          case 'list':
            lengthFn = redisClient.llen;
            break;
          case 'set':
            lengthFn = redisClient.scard;
            break;
          case 'zset':
            lengthFn = redisClient.zcard;
            break;
          default:
            fullfillAndClose(null);
            return;
        }

        lengthFn.call(redisClient, self.args.REDIS_KEY, function(err, length) {
          if (err) {
            console.log(err);
            length = null;
          }

          fullfillAndClose(length);
        });
      } catch (e) {
        console.log(e);
        fullfillAndClose(null);
      }
    });
  }
};
