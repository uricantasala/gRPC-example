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
const { VideogameService } = grpc.loadPackageDefinition(packageDefinition);

const port = process.env.PORT || 3000;

const client = new VideogameService(
    `localhost:${port}`,
    grpc.credentials.createInsecure()
);

module.exports = { client };

//  c.client.add( { id: 3432342 , name: "test!" } , (e,r) => console.log(r) )
//  c.client.all(null , (e,r) => console.log(r.videogames.reverse()[0]) )
