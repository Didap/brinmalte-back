/**
 * Global middleware: replies 200 on /health for infrastructure health checks.
 *
 * Enabled via `config/middlewares.ts` as `global::health`.
 */
export default () => {
  return async (ctx, next) => {
    if (ctx.path === '/health') {
      ctx.status = 200;
      ctx.type = 'application/json';
      ctx.body = { status: 'ok' };
      return;
    }

    await next();
  };
};


