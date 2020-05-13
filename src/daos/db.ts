import { Pool } from 'pg';
// make sure database is set to project_0
export const db = new Pool({
    database: 'project_0',
    host: process.env.NODE_APP_URL,
    port: 5432,
    user: process.env.NODE_APP_ROLE,
    password: process.env.NODE_APP_PASS
});