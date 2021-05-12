"use strict";

// Leemos el schema y lo cargamos
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(
    path.join(__dirname, "schema", "Services.proto"),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        arrays: true,
        oneofs: true,
    }
);
const { VideogameService, UserService } = grpc.loadPackageDefinition(packageDefinition);

const port = process.env.PORT || 3000;

const client = new VideogameService(
    `localhost:${port}`,
    grpc.credentials.createInsecure()
);

const clientUser = new UserService(
    `localhost:${port}`,
    grpc.credentials.createInsecure()
);

module.exports = { client, clientUser};

//  c.client.add( { id: 3432342 , name: "test!" } , (e,r) => console.log(r) )
 client.all(null , (e,r) => console.log(r.videogames.reverse()[0]) )
 clientUser.all(null , (e,r) => console.log(r.users.reverse()[0]) )