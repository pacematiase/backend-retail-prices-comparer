import { config } from './shared/env/env.js';
import { sUserInsert } from './user/service.js';
import { newSchema } from './shared/db/orm.js';
import { UserRole } from './shared/enums/userRole.js';

console.log(`\n Dropping and re-creating database schema`);
await newSchema();
console.log(`\n Creating default administrator user`);
await sUserInsert({
  userName: 'admin',
  userPassword: 'admin',
  userRole: UserRole.administrator,
});

console.log(`\n Process successful`)

process.exit();