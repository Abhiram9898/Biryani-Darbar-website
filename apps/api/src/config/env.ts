import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV ?? 'development';
if (nodeEnv === 'production' && !process.env.MONGO_URI) {
  throw new Error('Missing required production environment variable: MONGO_URI');
}

const clientUrls = (process.env.CLIENT_URL ?? 'http://localhost:5173')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean);

export const env = {
  nodeEnv,
  port: Number(process.env.PORT ?? 8080),
  clientUrls,
  mongoUri: process.env.MONGO_URI ?? '',
  mongoDbName: process.env.MONGO_DB_NAME ?? 'biryani-darbar',
  dnsServers: (process.env.DNS_SERVERS ?? '8.8.8.8,1.1.1.1').split(',').map(value => value.trim()).filter(Boolean),
};
