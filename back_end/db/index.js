const Pool = require('pg').Pool; //Use this instead of Clients

let dbURL = {
    connectionString: process.env.DATABASE_URL  || 'postgres://postgres:postgres@localhost:5432/postgres'
}

const pool = new Pool(dbURL);

pool.connect();
exports.getUsers = (req, res) => {
    pool.query('SELECT * from users limit 3', (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(results.rows);
    })
}


exports.authUserByName = async(username) => {
    const results = await pool.pool.query("SELECT * from user where username = $1", [username])
    
    return json(results.rows[0])
    
}