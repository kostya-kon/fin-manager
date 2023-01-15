import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dialect: process.env.DATABASE_DIALECT || 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  minPoolSize: parseInt(process.env.DATABASE_MIN_POOL_SIZE, 10) || 5,
  maxPoolSize: parseInt(process.env.DATABASE_MAX_POOL_SIZE, 10) || 50,
  timezone: process.env.DATABASE_TIMEZONE || '+00:00',
}));
