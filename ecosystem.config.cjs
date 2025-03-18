module.exports = {
  apps: [{
    name: 'magic-mirror-habitica',
    script: 'src/server.js',
    watch: true,
    env: {
      NODE_ENV: 'production',
    },
  }]
}