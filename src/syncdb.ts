import { config } from './shared/env/env.js';
import { syncSchema } from './shared/db/orm.js';

console.log(`\n Syncing database schema`);
await syncSchema();

console.log(`\n Database schema was successfully updated`)

process.exit();