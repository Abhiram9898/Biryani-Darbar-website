import mongoose from 'mongoose';
import dns from 'node:dns';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export async function connectDB() {
  try {
    await mongoose.connect(env.mongoUri, { dbName: env.mongoDbName });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!env.mongoUri.startsWith('mongodb+srv://') || !message.includes('querySrv ECONNREFUSED')) throw error;
    dns.setServers(env.dnsServers);
    logger.warn({ message: 'Default DNS could not resolve MongoDB SRV; retrying with configured DNS servers' });
    await mongoose.connect(env.mongoUri, { dbName: env.mongoDbName });
  }
  logger.info({ message: 'MongoDB connected', database: mongoose.connection.name });
}
