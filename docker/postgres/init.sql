-- Local development Postgres bootstrap for Strapi.
-- Creates a dedicated schema and sets search_path for the Strapi role.

CREATE SCHEMA IF NOT EXISTS strapi AUTHORIZATION strapi;
GRANT USAGE, CREATE ON SCHEMA strapi TO strapi;

ALTER ROLE strapi IN DATABASE brinmalte SET search_path = strapi, public;


