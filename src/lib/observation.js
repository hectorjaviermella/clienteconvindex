"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observationToFhir = void 0;
var _a = require('fhir.js'), Client = _a.Client, Resource = _a.Resource;
function observationToFhir(observationData) {
    var i = 0;
    //console.log("entra xx" , observationData );
    console.log("entra  a observation.ts ");
    var result = [];
    for (var _i = 0, observationData_1 = observationData; _i < observationData_1.length; _i++) {
        var elemjson = observationData_1[_i];
        //suma += numero;
        console.log("result x ", elemjson);
        console.log("result x ", elemjson.proteinaC);
        // let observation = null;
        ///////////////////////////////////proteinaC
        if (elemjson.proteinaC > 0) {
            var observation = {
                resourceType: 'Observation',
                status: 'final',
                code: {
                    coding: [
                        {
                            system: 'http://loinc.org',
                            id: 'lab-${elemjson.sync_id}',
                            code: '12345-6',
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
        if (elemjson.plaquetas > 0) {
            var observation = {
                resourceType: "Observation",
                status: "final",
                code: {
                    coding: [
                        {
                            system: "http://loinc.org",
                            id: 'lab-${elemjson.sync_id}',
                            code: "777-3",
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
                effectiveDateTime: new Date(elemjson.fecha).toISOString(),
                valueQuantity: {
                    value: elemjson.plaquetas,
                    unit: "/uL",
                    system: "http://unitsofmeasure.org",
                    code: "/uL"
                },
            };
            result.push(observation);
        }
        ////////////////////////////////////////////linfopenia
        if (elemjson.linfopenia > 0) {
            var observation = {
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
                    value: elemjson.linfopenia,
                    unit: "/uL",
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
        if (elemjson.ldh > 0) {
            var observation = {
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
                    value: elemjson.ldh,
                    unit: "U/L",
                    system: "http://unitsofmeasure.org",
                    code: "U/L"
                },
                interpretation: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                            code: "L",
                            display: "Low"
                        }
                    ],
                    text: "LDH por debajo del rango normal"
                }
            };
            result.push(observation);
        }
        ///////////////////////////////////////////////ferritina
        if (elemjson.ferritina > 0) {
            var observation = {
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
                    value: elemjson.ferretina,
                    unit: "ug/L",
                    system: "http://unitsofmeasure.org",
                    code: "ug/L"
                },
                interpretation: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                            code: "N",
                            display: "Normal"
                        }
                    ],
                    text: "Nivel de ferritina dentro del rango normal"
                }
            };
            result.push(observation);
        }
        ///////////////////////////////////////////////dimeroD
        if (elemjson.dimeroD > 0) {
            var observation = {
                resourceType: "Observation",
                status: "final",
                code: {
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
                    value: elemjson.dimeroD,
                    unit: "ng/mL",
                    system: "http://unitsofmeasure.org",
                    code: "ng/mL"
                },
                interpretation: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                            code: "H",
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
} //termina export
exports.observationToFhir = observationToFhir;
