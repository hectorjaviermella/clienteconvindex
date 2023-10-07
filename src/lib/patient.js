"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = void 0;
var config_1 = require("./config");
/**
 * Encode a patient from covindex to FHIR
 * @param {} patient
 */
function encode(patient) {
    if (patient) {
        var identificadores = [];
        if (patient.documento) {
            identificadores.push({
                system: 'http://www.renaper.gob.ar/dni',
                value: patient.documento
            });
        }
        if (patient.cuil) {
            identificadores.push({
                system: 'http://www.renaper.gob.ar/cuil',
                value: patient.cuil
            });
        }
        identificadores.push({
            system: (0, config_1.getDominio)(),
            value: patient._id
        });
        // Parsea contactos
        var contactos = patient.contacto ? patient.contacto.filter(function (c) { return c.valor; }).map(function (unContacto) {
            var cont = {
                resourceType: 'ContactPoint',
                value: unContacto.valor,
                rank: unContacto.ranking,
            };
            switch (unContacto.tipo) {
                case 'fijo':
                    cont['system'] = 'phone';
                    break;
                case 'celular':
                    cont['system'] = 'phone';
                    break;
                case 'email':
                    cont['system'] = 'email';
                    break;
            }
            return cont;
        }) : [];
        // Parsea direcciones
        var direcciones = patient.direccion ? patient.direccion.filter(function (dir) { return dir.ubicacion.localidad; }).map(function (unaDireccion) {
            var direc = {
                resourceType: 'Address',
                postalCode: unaDireccion.codigoPostal ? unaDireccion.codigoPostal : '',
                line: [unaDireccion.valor],
                city: unaDireccion.ubicacion.localidad ? unaDireccion.ubicacion.localidad.nombre : '',
                state: unaDireccion.ubicacion.provincia ? unaDireccion.ubicacion.provincia.nombre : '',
                country: unaDireccion.ubicacion.pais ? unaDireccion.ubicacion.pais.nombre : '',
            };
            return direc;
        }) : [];
        // Parsea relaciones
        var relaciones = patient.relaciones ? patient.relaciones.filter(function (r) { return !!r.relacion; }).map(function (unaRelacion) {
            var relacion = {
                relationship: [{
                        text: unaRelacion.relacion.nombre
                    }],
                name: {
                    resourceType: 'HumanName',
                    family: unaRelacion.apellido.split(' '),
                    given: unaRelacion.nombre.split(' '), // Given names (not always 'first'). Includes middle names
                }
            };
            return relacion;
        }) : [];
        var genero = void 0;
        switch (patient.genero) {
            case 'femenino':
                genero = 'female';
                break;
            case 'masculino':
                genero = 'male';
                break;
            case 'otro':
                genero = 'other';
                break;
        }
        var pacienteFHIR = {
            id: patient.id,
            resourceType: 'Patient',
            identifier: identificadores,
            active: patient.activo ? patient.activo : null,
            name: [{
                    use: 'official',
                    resourceType: 'HumanName',
                    family: patient.apellido.split(' '),
                    given: patient.nombre.split(' '),
                    text: "".concat(patient.nombre, " ").concat(patient.apellido),
                    _family: [{
                            extension: [
                                {
                                    url: 'http://hl7.org/fhir/StructureDefinition/humanname-fathers-family',
                                    valueString: patient.apellido
                                },
                            ]
                        }],
                }],
            gender: genero,
            birthDate: patient.fechaNacimiento ? typeof patient.fechaNacimiento === 'string' ? new Date(patient.fechaNacimiento).toISOString().slice(0, 10) : patient.fechaNacimiento.toISOString().slice(0, 10) : null
        };
        if (patient.fechaFallecimiento) {
            pacienteFHIR.deceasedDateTime = typeof patient.fechaFallecimiento === 'string' ? new Date(patient.fechaFallecimiento.toISOString().slice(0, 10)) : patient.fechaFallecimiento.toISOString().slice(0, 10);
        }
        if (patient.estadoCivil) {
            var estadoCivil = void 0;
            switch (patient.estadoCivil) {
                case 'casado':
                    estadoCivil = 'Married';
                    break;
                case 'divorciado':
                    estadoCivil = 'Divorced';
                    break;
                case 'viudo':
                    estadoCivil = 'Widowed';
                    break;
                case 'soltero':
                    estadoCivil = 'unmarried';
                    break;
                default:
                    estadoCivil = 'unknown';
                    break;
            }
            pacienteFHIR['maritalStatus'] = {
                text: estadoCivil
            };
        }
        if (patient.foto) {
            pacienteFHIR['photo'] = [{
                    patient: patient.foto
                }];
        }
        if (contactos.length > 0) { // A contact detail for the individual
            pacienteFHIR['telecom'] = contactos;
        }
        if (direcciones.length > 0) { // Addresses for the individual
            pacienteFHIR['address'] = direcciones;
        }
        if (relaciones.length > 0) { // A contact party (e.g. guardian, partner, friend) for the patient
            pacienteFHIR['contact'] = relaciones;
        }
        return pacienteFHIR;
    }
    else {
        return null;
    }
}
exports.encode = encode;
//# sourceMappingURL=patient.js.map