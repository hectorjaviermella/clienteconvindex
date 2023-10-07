"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var websocket_ts_1 = require("websocket-ts");
//var ws = new WebsocketBuilder('wss://covindex.uncoma.edu.ar:8082/lider').build();
console.log('arranco');
var ws = new websocket_ts_1.WebsocketBuilder('wss://covindex.uncoma.edu.ar:8082/lider')
    .onMessage(function (i, e) { console.log("echo sent"); })
    .onMessage(function (i, e) { i.send(e.data); })
    .onMessage(function (i, e) { console.log("message received"); })
    .build();
