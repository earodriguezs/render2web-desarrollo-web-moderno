/**
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * @copyright Eazicom Servicios Profesionales - 2026
 * Todos los derechos reservados.
 */

import Env from 'dotenv';

export enum Enviroment { 
    development = "DEV",
    production = "PRD"
}

/** 
 * @class WebConfig
 * @description Provee el acceso al valor establecido para las variables de
 * entorno en el archivo de configuración.
 */
class WebConfig {

    //#region -- Definiciòn de propiedades --

    /**
     * @type {string}
     * @description El dominio para acceder a la aplicación establecido en el
     * archivo de configuración.
     */
    get domain(): string {
        return ( process.env.DOMAIN || "" );
    }

    /**
     * Obtiene el puerto establecido en el archivo de configuración para
     * recibir solicitudes del cliente.
     * @returns {number} Puerto de escucha del servidor.
     */
    get port(): number {
        return parseInt( process.env.PORT || '80' );
    }

    /**
     * @type {string}
     */
    get enviroment(): Enviroment {
        return ( process.env.ENVIROMENT ? <Enviroment>process.env.ENVIROMENT
                                        : Enviroment.production );
    }
    //#endregion

    /**
     * @description Constructor estático de la clase.
     */
    constructor() {
        Env.config();
    }
}

export const WEB_CONFIG: WebConfig = new WebConfig();
