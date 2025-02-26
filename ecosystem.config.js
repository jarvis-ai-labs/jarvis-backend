module.exports = {
  apps: [
    {
      name: 'jarvis-backend',
      script: 'node',
      args: 'build/server.js',
      autorestart: true,
      max_restarts: 5,
      min_uptime: '10s',
      restart_delay: 5000,
      out_file: 'logs/jarvis-backend/normal.log',
      error_file: 'logs/jarvis-backend/error.log',
      combine_logs: true,
    },
  ]
};