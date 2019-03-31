const {
  NODE_ENV,
  DB_HOST,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_MACHINE,
  SECRET,
  PORT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env;

const ENV = {
  development: {
    NODE_ENV,
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_MACHINE,
    SECRET,
    PORT,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
  },
  production: {
    NODE_ENV,
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_MACHINE,
    SECRET,
    PORT,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
  },
  staging: {
    NODE_ENV,
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_MACHINE,
    SECRET,
    PORT,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
  },
};

function getEnvVars(env = '') {
  if (env === 'production') return ENV.production;
  return ENV.development || ENV.staging;
}

export default getEnvVars(process.env.NODE_ENV);
