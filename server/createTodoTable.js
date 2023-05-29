const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
		rejectUnauthorized: false,
	},
});

  const createTodoTable = async () => await pool.query(
      "CREATE TABLE todo (todo_id SERIAL PRIMARY KEY, description VARCHAR(255) NOT NULL)"
    );


console.log(createTodoTable());




