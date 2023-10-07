const fhir = require('fhir.js');
//const fhirClient = fhir({ baseUrl: 'https://my-fhir-server.com' });
 // cambiar por la URL de tu servidor FHIR

// Supongamos que tenemos una tabla SQL llamada 'observaciones' que contiene la información de las observaciones de los pacientes, incluyendo la información de plaquetas a la mínima expresión
const plaquetaQuery = "SELECT * FROM observaciones WHERE tipo = 'plaqueta_minima_expresion'";

// Ejecutamos la consulta a la base de datos y obtenemos los resultados
const results = executeQuery(plaquetaQuery);

// Creamos un recurso Observation para cada resultado obtenido y lo enviamos al servidor FHIR
results.forEach(result => {
  const observation = {
    resourceType: 'Observation',
    status: 'final',
    category: [
      {
        coding: [
          {
            system: 'http://hl7.org/fhir/observation-category',
            code: 'laboratory',
            display: 'Laboratory'
          }
        ]
      }
    ],
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '26515-7',
          display: 'Platelet count'
        }
      ],
      text: 'Plaquetas a la mínima expresión'
    },
    subject: {
      reference: 'Patient/' + result.patientId
    },
    effectiveDateTime: result.date,
    valueQuantity: {
      value: result.plaquetas,
      unit: '10*3/uL'
    },
    interpretation: {
      coding: [
        {
          system: 'http://hl7.org/fhir/ValueSet/observation-interpretation',
          code: result.interpretacion,
          display: result.interpretacionDisplay
        }
      ]
    },
    note: [
      {
        text: 'Plaquetas a la mínima expresión en el paciente.'
      }
    ]
  };
  
  // Enviamos el recurso al servidor FHIR
  fhirClient.create({
    resourceType: 'Observation',
    body: observation
  }).then(response => {
    console.log('Observation created:', response.data);
  }).catch(error => {
    console.error('Error creating observation:', error);
  });
});
