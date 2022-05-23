const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_CLUSTER: process.env.DB_CLUSTER,
        DB_NAME_PROJECT: 'auth-project-dev',
      },
    }
  }

  return {
    env: {
      DB_USER: process.env.DB_USER,
      DB_PASS: process.env.DB_PASS,
      DB_CLUSTER: process.env.DB_CLUSTER,
      DB_NAME_PROJECT: 'auth-project',
    },
  }
}
