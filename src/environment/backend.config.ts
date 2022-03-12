import { registerAs } from '@nestjs/config';

export default registerAs('backendApi', () => ({
  signupApiUrl: process.env.SIGNUP_API_URL,
}));
