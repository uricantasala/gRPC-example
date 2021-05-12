const { connection: conn } = require("./connection");

async function add(call, callback) {
    let user = call.request;

    const [rows, fields] = await conn
        .promise()
        .query(`INSERT INTO users (name,login,password) VALUES (?,?,?)`, user.name,user.login,user.password);

    user.id = rows.insertId;

    callback(null, user);
}

async function all(call, callback) {
    console.log("all users");
    const [rows, fields] = await conn
        .promise()
        .query(`SELECT * FROM users`);
    console.log(rows)
    callback(null, { users: rows });
}


module.exports = {
    all,
    add,
};
