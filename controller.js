const { connection: conn } = require("./connection");

async function add(call, callback) {
    let videogame = call.request;

    const [rows, fields] = await conn
        .promise()
        .query(`INSERT INTO videogames (name) VALUES (?)`, videogame.name);

    videogame.id = rows.insertId;

    callback(null, videogame);
}
async function all(call, callback) {
    console.log("all videogames");
    const [rows, fields] = await conn
        .promise()
        .query(`SELECT * FROM videogames`);

    callback(null, { videogames: rows });
}

module.exports = {
    all,
    add,
};
