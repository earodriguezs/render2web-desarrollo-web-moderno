/**
 * Desarrollo Web moderno con HTML5, CSS3 y JavaScript 2026.
 * Sección 27: Introducción completa a HTMX.
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * @license MIT
 */

import Env from 'dotenv';

export interface IServerConfig {
    domain: string;
    port: number;
}

/**
 * Clase para manejar la configuración del entorno de la aplicación.
 * Carga las variables de entorno desde un archivo .env y proporciona
 * métodos para acceder a ellas de manera segura.
 */
export default class Enviroment {
    
    /**
     * Carga las variables de entorno desde el archivo .env.
     */
    static {
        Env.config();
    }

    /**
     * Obtiene el puerto desde las variables de entorno.
     * @returns {number} El puerto configurado. El valor por defecto es 80.
     */
    private static get port(): number {
        if ( !process.env.PORT )
            return 80;
        return parseInt( process.env.PORT );
    }
    
    /**
     * Obtiene el dominio desde las variables de entorno.
     * @returns {string} El dominio configurado.
     */
    private static get domain(): string {
        if ( !process.env.DOMAIN )
            return "";
        return process.env.DOMAIN.toLowerCase();
    }

    public static get serverConfig(): IServerConfig {
        return {
            domain: this.domain,
            port: this.port
        };
    }
}
