import { registerAs } from '@nestjs/config';

export default registerAs('coreApi', () => ({
  coreApiUrl: process.env.CORE_API_URL,
}));
