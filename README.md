# What is this?

A plugin to monitor a redis list length and set cardinality via [storm.dev](https://storm.dev) custom cummands.

## How to use
This plugin can be installed directly from the storm.dev dashboard.

### Manual install
* cd into ${path_to_storm_node}/storm_modules/custom/
* ```git clone https://github.com/coppolafab/cway-storm-redis-llen.git && cd cway-storm-redis-llen && npm i```
* edit the .env file if needed
* register a new custom command on storm.dev as 'cway-storm-redis-llen'
