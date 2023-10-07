let { Client, Resource } = require('fhir.js');

export function observationToFhir(observationData: Array<any>):  Array<any> {
  let i = 0;
  //console.log("entra xx" , observationData );
  console.log("entra  a observation.ts "  );

  
  let result = [];
 
  for (let elemjson of observationData) {
    //suma += numero;
    console.log("result x ", elemjson);
    console.log("result x ", elemjson.proteinaC);
    // let observation = null;
    ///////////////////////////////////proteinaC
        if (elemjson.proteinaC > 0 ){
          
          
           let observation: typeof Resource = {
            resourceType: 'Observation',
            status: 'final',            
            code: {
              coding: [
                {
                  system: 'http://loinc.org',
                  id: 'lab-${elemjson.sync_id}',
                  code: '12345-6', // Código LOINC adecuado para el tipo de análisis de laboratorio
                  display: 'Resultado del análisis de laboratorio'
                }
              ],
              text: "Cantidad de proteina C" // Texto descriptivo del código

            },
            subject: {
              identifier: {
                system: 'http://yourhospital.org/patients',
                value: elemjson.cuil
              }
            },
            effectiveDateTime: new Date(elemjson.fecha).toISOString(),
            valueQuantity: {        
              value: elemjson.proteinaC,
              unit: 'mg/dL',
              system: "http://unitsofmeasure.org",
              code: "mg/L"
            },
          };
          result.push(observation);

        }
        
  ////////////////////////////////////////////plaquetas
        if (elemjson.plaquetas > 0 ){
         
            let observation: typeof Resource = {
              resourceType: "Observation",
              status: "final",
             code : {
               coding: [
                {
                  system: "http://loinc.org",
                  id: 'lab-${elemjson.sync_id}',
                  code: "777-3", // Código LOINC para las plaquetas
                  display: "Platelet count" // Nombre de la observación
                }
              ],
              text: "Recuento de plaquetas" // Texto descriptivo del código
            },
            subject: {
              identifier: {
                system: 'http://yourhospital.org/patients',
                value: elemjson.cuil
              }
            },

            effectiveDateTime: new Date(elemjson.fecha).toISOString(), // Fecha y hora de la observación
            valueQuantity: {
              value: elemjson.plaquetas, // Valor numérico de las plaquetas
              unit: "/uL", // Unidad de medida (por microlitro)
              system: "http://unitsofmeasure.org",
              code: "/uL"
            },
          };
          result.push(observation);
        }
  ////////////////////////////////////////////linfopenia
  if (elemjson.linfopenia > 0 ){
    
      let observation: typeof Resource = {
                resourceType: "Observation",
                status: "final",
                code: {
                  coding: [
                    {
                      system: "http://loinc.org",
                      code: "8480-6",
                      display: "Lymphocytes [#/volume] in Blood"
                    }
                  ],
                  text: "Linfocitos en sangre"
                },
                subject: {
                  identifier: {
                    system: 'http://yourhospital.org/patients',
                    value: elemjson.cuil
                  }
                },
                effectiveDateTime: "2023-09-23T10:30:00Z",
                valueQuantity: {
                  value: elemjson.linfopenia, // Valor numérico de los linfocitos (por ejemplo, 800 linfocitos por microlitro)
                  unit: "/uL", // Unidad de medida (microlitros)
                  system: "http://unitsofmeasure.org",
                  code: "/uL"
                },
                interpretation: {
                  coding: [
                    {
                      system: "http://hl7.org/fhir/v2/0078",
                      code: "L",
                      display: "Below low normal"
                    }
                  ],
                  text: "Linfopenia (por debajo del rango normal)"
                }
              };
              result.push(observation);
       }


       ////////////////////////////////////////////ldh desidrogenasa láctica
       if (elemjson.ldh > 0 ){
        let observation: typeof Resource =  {
          resourceType: "Observation",
          status: "final",
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: "14804-9",
                display: "Lactate dehydrogenase [Enzymatic activity/volume] in Serum or Plasma"
              }
            ],
            text: "Desidrogenasa láctica (LDH) en suero o plasma"
          },
          subject: {
            identifier: {
              system: 'http://yourhospital.org/patients',
              value: elemjson.cuil
            }
          },
          effectiveDateTime: "2023-09-23T10:30:00Z",
          valueQuantity: {
            value: elemjson.ldh, // Valor numérico de LDH (por ejemplo, 200 unidades por litro)
            unit: "U/L", // Unidad de medida (unidades por litro)
            system: "http://unitsofmeasure.org",
            code: "U/L"
          },
          interpretation: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                code: "L", // Código para interpretación baja
                display: "Low"
              }
            ],
            text: "LDH por debajo del rango normal"
          }
        };
             result.push(observation);
       }
       


      ///////////////////////////////////////////////ferritina
          if (elemjson.ferritina > 0 ){
            let observation: typeof Resource =  {
          
            resourceType: "Observation",
            status: "final",
            code: {
              coding: [
                {
                  system: "http://loinc.org",
                  code: "2276-4",
                  display: "Ferritin [Mass/volume] in Serum or Plasma"
                }
              ],
              text: "Ferritina en suero o plasma"
            },
            subject: {
              identifier: {
                system: 'http://yourhospital.org/patients',
                value: elemjson.cuil
              }
            },
            effectiveDateTime: "2023-09-23T10:30:00Z",
            valueQuantity: {
              value: elemjson.ferretina, // Valor numérico de la ferritina (por ejemplo, 50 microgramos por litro)
              unit: "ug/L", // Unidad de medida (microgramos por litro)
              system: "http://unitsofmeasure.org",
              code: "ug/L"
            },
            interpretation: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                  code: "N", // Código para interpretación normal
                  display: "Normal"
                }
              ],
              text: "Nivel de ferritina dentro del rango normal"
            }
          };
          result.push(observation);
    }
      
   ///////////////////////////////////////////////dimeroD
      if (elemjson.dimeroD > 0 ){
            let observation: typeof Resource =  {
              resourceType: "Observation",
              status: "final",
              code : {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "32409-9",
                    display: "D-dimer DDU [Mass/volume] in Platelet poor plasma by High sensitivity method"
                  }
                ],
                text: "Dimero-D en plasma pobre en plaquetas por método de alta sensibilidad"
              },
              subject: {
                identifier: {
                  system: 'http://yourhospital.org/patients',
                  value: elemjson.cuil
                }
              },
              effectiveDateTime: "2023-09-23T10:30:00Z",
              valueQuantity: {
                value: elemjson.dimeroD, // Valor numérico del dimero-D (por ejemplo, 500 nanogramos por mililitro)
                unit: "ng/mL", // Unidad de medida (nanogramos por mililitro)
                system: "http://unitsofmeasure.org",
                code: "ng/mL"
              },
              interpretation: {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                    code: "H", // Código para interpretación alta
                    display: "High"
                  }
                ],
                text: "Nivel de dimero-D elevado (por encima del rango normal)"
              }
            };
            result.push(observation);
      }









  //////////////////////////////////


    
    


    //////////////////////////////////
    




  } //termina for
  
  return result;
}//termina export





