import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error.js';
import { routes } from './routes/index.js';
import { ApiError } from './utils/apiError.js';

export function createApp() {
  const app = express();
  const webDist = fileURLToPath(new URL('../../web/dist', import.meta.url));
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors((req, callback) => {
    const origin = req.header('Origin');
    let sameHost = false;
    try {
      sameHost = Boolean(origin && new URL(origin).host === req.get('host'));
    } catch {}
    if (!origin || sameHost || env.clientUrls.includes(origin)) {
      return callback(null, { origin: true });
    }
    callback(new ApiError(403, 'Origin not allowed'));
  }));
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(mongoSanitize());
  app.use(hpp());
  app.use(rateLimit({ windowMs: 15 * 60_000, limit: 300, standardHeaders: true, legacyHeaders: false }));
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'tiny'));
  app.get('/api/health', (_req, res) => res.json({ success: true, status: 'ok' }));
  app.get('/api/ready', (_req, res) => {
    const ready = mongoose.connection.readyState === 1;
    res.status(ready ? 200 : 503).json({ success: ready, database: ready ? 'connected' : 'disconnected' });
  });
  app.use('/api', routes);
  if (existsSync(join(webDist, 'index.html'))) {
    app.use(express.static(webDist, { index: false, maxAge: '1d' }));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      res.sendFile(join(webDist, 'index.html'));
    });
  }
  app.use((_req, _res, next) => next(new ApiError(404, 'Route not found')));
  app.use(errorHandler);
  return app;
}
