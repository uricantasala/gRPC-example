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
    let [rows, fields] = await conn
        .promise()
        .query(`SELECT * FROM videogames`);
        const [rows2, fields2] = await conn
        .promise()
        .query(`SELECT * FROM users inner join scores on scores.user=users.id`);
    console.log(rows)
    console.log(rows2)
    rows.forEach((v) => {
        v.users = []
        rows2.forEach((u) => {
            if(v.id=u.videogame) v.users.push(u)
        })
    })

    callback(null, { videogames: rows });
}


module.exports = {
    all,
    add,
};
