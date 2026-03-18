import { postgresJsConfig, setEnvironmentVariables } from './lib/config.js';

// .env file to `process.env`
setEnvironmentVariables();

export default postgresJsConfig;
