const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
		rejectUnauthorized: false,
    ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
	},
});

  const createTodoTable = async () => await pool.query(
      "CREATE TABLE todo (todo_id SERIAL PRIMARY KEY, description VARCHAR(255) NOT NULL)"
    );


console.log(createTodoTable())


module.exports = pool


