module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: "live-demo",
      script: "server.js",
      interpreter: '/Users/mac/.nvm/versions/node/v8.9.4/bin/node',
      exec_mode: 'cluster',
      instances: 2,
      env: {
        LIVE_DEMO_PORT: 8001,
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: "root",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy": "npm install --only=prod && pm2 startOrRestart ecosystem.config.js --env production"
    },
    dev: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/development",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env dev",
      env: {
        NODE_ENV: "dev"
      }
    }
  }
}
