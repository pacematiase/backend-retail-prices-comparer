import { config } from '../env/env.js';
import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init({
  driver: MySqlDriver,
  host: config.DATABASE_HOST,
  port: config.DATABASE_PORT,
  dbName: config.DATABASE_NAME,
  user: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  entities: ['dist/**/*entity.js'],
  entitiesTs: ['src/**/*entity.ts'],
  debug: config.DATABASE_DEBUG,
  highlighter: new SqlHighlighter(),
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
};

export const newSchema = async () => {
  const generator = orm.getSchemaGenerator();
  await generator.dropSchema();
  await generator.createSchema();
};
