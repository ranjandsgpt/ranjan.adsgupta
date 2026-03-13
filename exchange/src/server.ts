import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import sensible from '@fastify/sensible';
import rateLimit from '@fastify/rate-limit';
import { registerAdRequestRoute } from './routes/ad-request';
import { registerBeaconRoute } from './routes/beacon';
import { TestBidderAdapter } from './integrations/adapters/test-bidder';

const PORT = Number(process.env.PORT || 3001);

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
  });

  await fastify.register(cors, {
    origin: true,
  });
  await fastify.register(helmet);
  await fastify.register(sensible);
  await fastify.register(rateLimit, {
    max: 1000,
    timeWindow: '1 minute',
  });

  const testAdapter = new TestBidderAdapter();

  await registerAdRequestRoute(fastify, [testAdapter]);
  await registerBeaconRoute(fastify);

  fastify.get('/status', async () => {
    return {
      status: 'healthy',
      version: '0.1.0',
      uptime: process.uptime(),
      auctions_last_hour: 0,
      active_dsps: 1,
      avg_latency_ms: 0,
      fill_rate: 0,
    };
  });

  return fastify;
}

async function start() {
  try {
    const app = await buildServer();
    await app.listen({ port: PORT, host: '0.0.0.0' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
}

void start();

