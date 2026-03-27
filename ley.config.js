import { postgresJsConfig, setEnvironmentVariables } from './lib/config.ts';

// .env file to `process.env`
setEnvironmentVariables();

export default postgresJsConfig;
