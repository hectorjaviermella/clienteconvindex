
import { connection } from "websocket";


import { observationToFhir  } from "./observation";

//import observationToFhir from './observation.js';;

var WebSocketClient = require('websocket').client;
//const clienteWS = require('websocket').client;

var clienteWSApp = new WebSocketClient();
//const clienteWSApp = new clienteWS();

var contador: number = 1;
var token: String = "";

//clienteWSApp.connect('wss://covindex.uncoma.edu.ar:8082/lider','echo-protocol');
//clienteWSApp.connect('wss://covindex.uncoma.edu.ar:8082/lider');

clienteWSApp.connect('ws://covindex.uncoma.edu.ar:8082/lider');



clienteWSApp.on('connectFailed', function (error: Error) {
  console.log('Connect Error xx : ' + error.toString());

});

//
clienteWSApp.on('connect', function (connection: connection) {

  console.log('WwebSocket cliente conectado ' + connection);
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
      
      //console.log('message ', response);
     // console.log('data ',  response.get_data);
      var msjenvio2json = msjenvio1json;
      var res = response.utf8Data;
      var resultadoenvio1json = JSON.parse(res);

      

      if (contador == 2) {  //Connect

        console.log('vuelta segundo hello / respuesta del server');
        console.log(resultadoenvio1json);
        contador = contador + 1;
        msjenvio2json.method = "connect";
        msjenvio2json.token = resultadoenvio1json.result.token;
        token = msjenvio2json.token;
        var hospital = resultadoenvio1json.result.hospitales;
        let params =
        {
          "hospital": hospital[0].idHospital,
          "sector": hospital[0].sectores[0].idSector,
          "isla": "I0"


        }


        msjenvio2json.params = params;
        msjenvio2json = JSON.stringify(msjenvio2json);
        console.log('msj envio2json  connect');
        console.log(msjenvio2json);
        //  console.log(msjenvio2json);
        connection.send(msjenvio2json);

      }


      if (contador == 3) {
        console.log("///////////////////////////////////////////////////////////////////////////////////");
        contador = contador + 1;
        var res = response.utf8Data;
        var resultadoenvio1json = JSON.parse(res);
        console.log('vuelta segundo haskhan');
        // console.log(res);
        console.log(resultadoenvio1json);

        const myJSON = JSON.stringify(resultadoenvio1json);
        console.log(myJSON);

      }



      if (contador == 4) {
        console.log("///////////////////////////////////////////////////////////////////////////////////");
        console.log(' get_update envio  contador 4 ');
        var res4 = response.utf8Data;
        var resultadoenvio3json = JSON.parse(res4);
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

        return contador;
      }




      if (contador == 5) {
        
        //contador = contador + 1;
        /*var res = response.utf8Data;
        console.log("xxx 55 " ,response.utf8Data);*/

       // console.log('message ', response);
        var result = response.utf8Data;
        
        let resultjson  = JSON.parse(result);
        if (resultjson.result.result!=undefined){
          console.log("////////////////////////////////////////////////////////////////////////////////////");
        console.log('vuelta get_update contador 5');

        let total = resultjson.result.result;
        console.log('result ', total);
        console.log("////////////////////////////////////////////////////////////////////////////////////");
       /* let usuarios_sector = resultjson.result.result.usuarios_sector;
        console.log('usuarios_sector x ', usuarios_sector);
        console.log("////////////////////////////////////////////////////////////////////////////////////");
        let usuarios_hospital = resultjson.result.result.usuarios_hospital;
        console.log('usuarios_hospital ', usuarios_hospital);
        console.log("////////////////////////////////////////////////////////////////////////////////////");
        let usuarios = resultjson.result.result.usuarios;
        console.log('usuarios ', usuarios);
        console.log("////////////////////////////////////////////////////////////////////////////////////");
        let signosVitales = resultjson.result.result.signosVitales;
        console.log('signosVitales ', signosVitales);
        console.log("////////////////////////////////////////////////////////////////////////////////////");
        let sectores = resultjson.result.result.sectores;
        console.log('sectores ', sectores);
        console.log("////////////////////////////////////////////////////////////////////////////////////");
        let rx_toraxs = resultjson.result.result.rx_toraxs;
        console.log('rx_toraxs ', rx_toraxs);*/
        console.log("////////////////////////////////////////////////////////////////////////////////////");
        let laboratorios = resultjson.result.result.laboratorios;
        console.log('laboratorios de json to fhir');
        const fhirObservation = observationToFhir(laboratorios);
        console.log("resultado uff " , fhirObservation);
       /* console.log("////////////////////////////////////////////////////////////////////////////////////");
        let islas = resultjson.result.result.islas;
        console.log('islas ', islas);
        console.log("////////////////////////////////////////////////////////////////////////////////////");
        let hcpacientes = resultjson.result.result.hcpacientes;
        console.log('hcpacientes ', hcpacientes);
        console.log("////////////////////////////////////////////////////////////////////////////////////");
        let camas = resultjson.result.result.camas;
        console.log('camas ', camas);
        console.log("////////////////////////////////////////////////////////////////////////////////////");
        let alertas = resultjson.result.result.alertas;
        console.log('alertas x ', alertas);
        console.log("////////////////////////////////////////////////////////////////////////////////////");
        */









        //console.log("vuelta del servidor despues ");
        //var resujson = JSON.parse(res);
        //console.log(resujson);
        /*
        var resultadoenvio1json = JSON.parse(res);
          console.log('vuelta get_update contador 5');
          console.log(msjenvio2json);
          */
        //const myJSON = JSON.stringify(resultadoenvio1json);
        //console.log(myJSON);

        }
      }
  

    





    }
  });

  connection.on('error', function (error) {
    // clienteWSApp.pong();
    console.log("coneccion error " + error.toString());


  });

  connection.on('close', function () {
    console.log('echo-protocol connection closed');

  });

});//fin de clienteWSApp.connect(




//miWebSocket.addEventListener('open', open);