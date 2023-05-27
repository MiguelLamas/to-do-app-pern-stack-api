const Pool = require("pg").Pool;

const pool = new Pool(
    "dpg-chn8qo9mbg5577k4da40-a.frankfurt-postgres.render.com",
    "perntodo_epek",
    "miguellamas",
    "5432",
    "xZ0iwBKiOE4UEclvFskfphqrPd5lt7B9"
);

  const makeDatabase = async () => await pool.query(
      "CREATE TABLE todo (todo_id SERIAL PRIMARY KEY, description VARCHAR(255) NOT NULL)"
    );

makeDatabase()


