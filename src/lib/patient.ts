
import { getDominio, makeUrl } from './config';

/**
 * Encode a patient from covindex to FHIR
 * @param {} patient
 */
export function encode(patient) {
    if (patient) {
        const identificadores: any = [];
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
            system: getDominio(),
            value: patient._id
        });
        // Parsea contactos
        let contactos = patient.contacto ? patient.contacto.filter(c => c.valor).map(unContacto => {
            let cont = {
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
        let direcciones = patient.direccion ? patient.direccion.filter(dir => dir.ubicacion.localidad).map(unaDireccion => {
            let direc = {
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
        let relaciones = patient.relaciones ? patient.relaciones.filter(r => !!r.relacion).map(unaRelacion => {
            let relacion = {
                relationship: [{
                    text: unaRelacion.relacion.nombre
                }], // The kind of relationship
                name: {
                    resourceType: 'HumanName',
                    family: unaRelacion.apellido.split(' '), // Family name (often called 'Surname')
                    given: unaRelacion.nombre.split(' '), // Given names (not always 'first'). Includes middle names
                }
            };
            return relacion;
        }) : [];
        let genero;
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
        let pacienteFHIR: any = {
            id: patient.id,
            resourceType: 'Patient',
            identifier: identificadores,
            active: patient.activo ? patient.activo : null, // Whether this patient's record is in active use
            name: [{
                use: 'official',
                resourceType: 'HumanName',
                family: patient.apellido.split(' '),
                given: patient.nombre.split(' '),
                text: `${patient.nombre} ${patient.apellido}`,
                _family: [{
                    extension: [
                        {
                            url: 'http://hl7.org/fhir/StructureDefinition/humanname-fathers-family',
                            valueString: patient.apellido
                        },
                    ]
                }],
            }],
            gender: genero, // male | female | other | unknown
            birthDate: patient.fechaNacimiento ? typeof patient.fechaNacimiento === 'string' ? new Date(patient.fechaNacimiento).toISOString().slice(0, 10) : patient.fechaNacimiento.toISOString().slice(0, 10) : null
        };
        if (patient.fechaFallecimiento) {
            pacienteFHIR.deceasedDateTime = typeof patient.fechaFallecimiento === 'string' ? new Date(patient.fechaFallecimiento.toISOString().slice(0, 10)) : patient.fechaFallecimiento.toISOString().slice(0, 10);
        }
        if (patient.estadoCivil) {
            let estadoCivil;
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
    } else {
        return null;
    }
}