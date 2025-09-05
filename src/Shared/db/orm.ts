import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init({
  driver: MySqlDriver,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*entity.js'],
  entitiesTs: ['src/**/*entity.ts'],
  debug: true,
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
