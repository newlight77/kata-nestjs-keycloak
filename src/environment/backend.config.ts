import { registerAs } from '@nestjs/config';

export default registerAs('backendApi', () => ({
  backendApiUrl: process.env.BACKEND_API_URL,
}));
