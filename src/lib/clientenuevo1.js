var WebSocketClient = require('websocket').client;
var clienteWSApp = new WebSocketClient();
var contador = 1;
var token = "";
clienteWSApp.connect('wss://covindex.uncoma.edu.ar:8082/lider');
clienteWSApp.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
});
clienteWSApp.on('connect', function (connection) {
    console.log('WebSocket Client Connected');
    var msjenvio1 = '{"version":"0.0","id":"1234","params":{"user":"20-0000-0", "password":"admin"},"method":"hello", "token":"0"}';
    var msjenvio1json = JSON.parse(msjenvio1);
    if (contador == 1) {
        contador = contador + 1;
        console.log('msj envio1  hello');
        console.log(msjenvio1);
        connection.send(msjenvio1);
    }
    connection.on('message', function (response) {
        if (response.type === 'utf8') {
            var msjenvio2json = msjenvio1json;
            var res = response.utf8Data;
            var resultadoenvio1json = JSON.parse(res);
            //console.log('contador' + contador);
            // console.log("Received: '" + response.utf8Data + "'");
            if (contador == 2) { //Connect
                console.log("///////////////////////////////////////////////////////////////////////////////////");
                console.log(' respuesta  contador 2 ');
                console.log('vuelta segundo hello / respuesta del server');
                console.log(resultadoenvio1json);
                contador = contador + 1;
                msjenvio2json.method = "connect";
                msjenvio2json.token = resultadoenvio1json.result.token;
                token = msjenvio2json.token;
                var hospital = resultadoenvio1json.result.hospitales;
                var params = {
                    "hospital": hospital[0].idHospital,
                    "sector": hospital[0].sectores[0].idSector,
                    "isla": "I0"
                };
                msjenvio2json.params = params;
                msjenvio2json = JSON.stringify(msjenvio2json);
                console.log('msj envio2json  connect');
                console.log(msjenvio2json);
                //  console.log(msjenvio2json);
                connection.send(msjenvio2json);
            } ///fin contador == 2
            if (contador == 3) {
                console.log("///////////////////////////////////////////////////////////////////////////////////");
                console.log(' respuesta  contador 3 ');
                contador = contador + 1;
                // var res = response.utf8Data;
                var resultadoenvio1json = JSON.parse(res);
                console.log('vuelta segundo haskhan');
                // console.log(res);
                console.log(resultadoenvio1json);
                //const myJSON = JSON.stringify(resultadoenvio1json);
                //console.log(myJSON);
            } ///fin contador == 3
            if (contador == 4) {
                console.log("///////////////////////////////////////////////////////////////////////////////////");
                console.log(' get_update envio  contador 4 ');
                // var res4 = response.utf8Data;
                var resultadoenvio3json = JSON.parse(res);
                // console.log("id " + resultadoenvio3json.id);
                var msjenvio4json = '{"params":{"sync_id_isla":1 , "sync_id_hospital":1 }, "method":"get_update" , "token":"0","version":"0.0" }';
                var msjenvio4obj = JSON.parse(msjenvio4json);
                msjenvio4obj.token = token;
                msjenvio4obj.id = resultadoenvio3json.id;
                contador = contador + 1;
                msjenvio4json = JSON.stringify(msjenvio4obj);
                console.log('msj envio4 get_update');
                console.log(msjenvio4json);
                connection.send(msjenvio4json);
            } ///fin contador == 4
            if (contador == 5) {
                console.log("////////////////////////////////////////////////////////////////////////////////////");
                console.log('vuelta get_update contador 5');
                var res5 = response.utf8Data;
                //var result5json = JSON.parse(res5);
                var result5json = JSON.stringify(res5);
                // var result5json = JSON.stringify(res5);
                //console.log(result5json.result.sync_id_isla);
                //console.log(result5json.result.result);
                // var usuarios_sector =result5json.result.result.usuarios_sector;
                //  var usuarios =result5json.result.result;
                /* var usuarios_hospital =result5json.result.result.usuarios_hospital;
                 var signosVitales =result5json.result.result.signosVitales;
       */
                console.log("resultado total " + result5json);
                var lista = res5;
                //console.log("lista: "+ lista['2']);
            } ///fin contador == 5
        } /// 
    }); /// termina el message
    connection.on('error', function (error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function () {
        console.log('echo-protocol Connection Closed');
    });
});
