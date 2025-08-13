import { MikroORM } from "@mikro-orm/core"
import { MySqlDriver } from "@mikro-orm/mysql"
import { SqlHighlighter } from "@mikro-orm/sql-highlighter"

export const orm = await MikroORM.init<MySqlDriver>({
    dbName: "retail-prices-comparer",
    entities: ["dist/**/*entity.js"],
    entitiesTs: ["src/**/*entity.ts"],
    host: "localhost",
    port: 3308,
    user: "root",
    password: "root",
    debug: true,
    highlighter: new SqlHighlighter(),
    schemaGenerator: {   // Never use this in production !!!!
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema:[],},
})

export const syncSchema  = async () => {
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
}