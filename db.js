import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
    user : "kshitizagarwal",
    password : "kshitiz123",
    port : "5432",
    database : "marquee"
})

export default pool;