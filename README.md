# What is this?

A plugin to monitor a redis list length via [storm.dev](https://storm.dev) custom cummands.

## How to use
* cd into ${path_to_storm_node}/storm_modules/custom/
* git clone https://github.com/coppolafab/cway-storm-redis-llen.git && cd cway-storm-redis-llen && cp .env.example .env && npm i
* edit the .env file if needed
* register a new custom command on storm.dev as 'cway-storm-redis-llen'
