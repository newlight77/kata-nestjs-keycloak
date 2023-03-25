import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../config/backend.env' });

console.log(`SIGNUP_API_URL : ${process.env.SIGNUP_API_URL}`);

export default registerAs('backendApi', () => ({
  signupApiUrl: process.env.SIGNUP_API_URL,
}));
