//console.log('arranca cliente');
var clienteWS = require('websocket').client;
var clienteWSApp = new clienteWS();
var contador = 1;
//clienteWSApp.connect('wss://covindex.uncoma.edu.ar:8082/lider','echo-protocol');
clienteWSApp.connect('wss://covindex.uncoma.edu.ar:8082/lider');
clienteWSApp.on('connectFailed', function (error) {
    console.log('Connect Error xx : ' + error.toString());
});
//
clienteWSApp.on('connect', function (connection) {
    console.log('WwebSocket cliente conectado ' + connection);
    var msjenvio1 = '{"version":"0.0","id":"1234","params":{"user":"20-0000-0", "password":"admin"},"method":"hello", "token":"0"}';
    var msjenvio1json = JSON.parse(msjenvio1);
    if (contador == 1) {
        contador = contador + 1;
        console.log('msj envio1  hello');
        console.log(msjenvio1);
        connection.send(msjenvio1);
    }
    connection.on('error', function (error) {
        // clienteWSApp.pong();
        console.log("coneccion error " + error.toString());
    });
    connection.on('close', function () {
        console.log('echo-protocol connection closed');
    });
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log("//////////// ////////////////////////////////////////////");
            console.log(' get_update contador 1');
            console.log('message ' + message.utf8Data);
            var msjenvio2json = msjenvio1json;
            var res = message.utf8Data;
            var resultadoenvio1json = JSON.parse(res);
            if (contador == 2) { //Connect
                console.log(' get_update contador 2');
                console.log('vuelta segundo hello');
                console.log(resultadoenvio1json);
                contador = contador + 1;
                msjenvio2json.method = "connect";
                msjenvio2json.token = resultadoenvio1json.result.token;
                var hospital = resultadoenvio1json.result.hospitales;
                var params = {
                    "hospital": hospital[0].idHospital,
                    "sector": hospital[0].sectores[0].idSector,
                    "isla": "I0"
                };
                msjenvio2json.params = params;
                console.log('msj envio2json  connect');
                console.log(msjenvio2json);
                // console.log(msjenvio2json);
                connection.send(msjenvio2json);
            }
            if (contador == 3) {
                console.log(' get_update contador 3');
                contador = contador + 1;
                var res = message.utf8Data;
                var resultadoenvio1json = JSON.parse(res);
                console.log('vuelta segundo haskhan');
                console.log(res);
                console.log(resultadoenvio1json);
                console.log("////////////  json ");
                var myJSON = JSON.stringify(resultadoenvio1json);
                console.log(myJSON);
                console.log("//////////// usuario");
                var usuario = JSON.stringify(resultadoenvio1json.result.usuario);
                console.log(usuario);
                console.log("//////////// token");
                var tokenstring = resultadoenvio1json.result.token;
                var token = JSON.stringify(resultadoenvio1json.result.token);
                //console.log(resultadoenvio1json.result.usuario);
                console.log(token);
                console.log("//////////// hospitales");
                var hospitales = JSON.stringify(resultadoenvio1json.result.hospitales);
                console.log(hospitales);
                console.log("//////////// pedir analisis");
                //let msjenvio4 = '{"sync_id" :"0", "version":"0.0", "id":"1234", "params":{"user":"20-0000-0", "password":"admin"},"method":"get_update", "token":"0"  }';        
                var msjenvio4 = '{"params":{"sync_id_isla":1 , "sync_id_hospital":1 }, "method":"get_update" , "token":"0","version":"0.0" }';
                var msjenvio4json = JSON.parse(msjenvio4);
                msjenvio4json.token = resultadoenvio1json.result.token;
                msjenvio4 = JSON.stringify(msjenvio4json);
                console.log("con token", msjenvio4);
                connection.send(msjenvio4);
                //return contador;
                ////////////////////////////
                if (contador == 4) {
                    console.log("//////////////////////////////////////////////////////");
                    console.log(' get_update contador 4');
                    var res4 = message.utf8Data;
                    var resultadoenvio1json4 = JSON.parse(res4);
                    /*
                       var msjenvio4 = '{"params":{"user":"20-0000-0", "password":"admin"},"method":"get_update", "token":"0"}';
                      var msjenvio4json = JSON.parse(msjenvio4);
                         contador= contador + 1;
                         console.log('msj envio4 get_update');*/
                    console.log(resultadoenvio1json4);
                    //connection.send(msjenvio4);
                }
                /*
                    if (contador ==5) {
                      console.log("//////////////////////////////////////////////////////");
                      console.log(' get_update contador 5');
                      contador= contador +1;
                      var res= message.utf8Data;
                      var resultadoenvio1json = JSON.parse(res);
                        console.log('vuelta get_data');
                        console.log(msjenvio2json);
                    }
                        */
            }
        }
    });
});
//miWebSocket.addEventListener('open', open);
