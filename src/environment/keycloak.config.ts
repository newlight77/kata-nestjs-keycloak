import { registerAs } from '@nestjs/config';

export default registerAs('keycloak', () => ({
  authServerUrl: process.env.AUTH_SERVER_URL,
  realm: process.env.REALM,
  clientId: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET,
}));
