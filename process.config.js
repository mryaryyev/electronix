module.exports = {
  apps : [{
    name   : "ELECTRONIX",
    cwd: "./",
    script : "./dist/server.js",
    watch: false,
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    },
    instances: 1, // 4 => 4 core, max => all core
    exec_mode: "cluster"
  }]
}