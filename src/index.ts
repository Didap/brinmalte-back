import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Health check endpoint for infrastructure monitoring
    strapi.server.routes([
      {
        method: 'GET',
        path: '/health',
        handler: async (ctx) => {
          ctx.status = 200;
          ctx.type = 'application/json';
          ctx.body = { status: 'ok' };
        },
        config: {
          auth: false,
        },
      },
    ]);
  },
};
