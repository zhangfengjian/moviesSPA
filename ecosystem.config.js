module.exports = {
  apps: [
    {
      name: 'hpapp',
      script: 'build/main.js',
      exec_mode: 'cluster',
      instances: 'max',
      env: {
        PORT: 3000,
        NODE_CONFIG: 'dev',
        NODE_ENV: 'development'
      },
      env_test: {
        PORT: 3000,
        NODE_CONFIG: 'test',
        NODE_ENV: 'production'
      },
      env_pre: {
        PORT: 3000,
        NODE_CONFIG: 'pre',
        NODE_ENV: 'production'
      },
      env_prod: {
        PORT: 3000,
        NODE_CONFIG: 'prod',
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '47.107.250.36', // 服务器IP
      ref: 'origin/master',
      repo: 'git@github.com:zhangfengjian/moviesSPA.git',
      path: '/var/www/moviesSPA',
      'post-deploy': 'yarn && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
