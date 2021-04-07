import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DB_URL,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}));
