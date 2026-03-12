/**
 * Desarrollo Web moderno con HTML5, CSS3 y JavaScript 2026.
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * @license MIT
 */

import Express, { type Application, type Router } from "express";
import { engine } from 'express-handlebars';

export default class Server {
    /**
     * Instancia de la aplicación Express.
     */
    private _app: Application = Express();

    constructor() {
        this.init();
    }

    private init(): void {
        this._app.engine( "handlebars", engine( {
            defaultLayout: "main",
            extname: ".hbs",
            layoutsDir: "./views/layouts/",
            partialsDir: "./views/partials/"
        } ) );
        this._app.set( "view engine", "handlebars" );
        this._app.set( "views", "./views/" ); 
        this._app.use( "/", Express.static( "./public/" ) );
        this._app.use( "/js", Express.static( "./node_modules/htmx/" ) );
    }

    /**
     * Agrega las rutas al servidor.
     * @param routes Un array de rutas de Express.
     * @returns void
     */
    public addRoutes( routes: Array<Router> ): void {
        if ( routes.length > 0 ) {
            routes.forEach( ( route ) => this._app.use( route ) );
        }
    }

    /**
     * Inicia el servidor en el puerto especificado.
     * @param port El puerto en el que iniciar el servidor.
     * @param host Nombre del host.
     * @returns void
     */
    public start( port: number, host: string ): void {
        let message: string = '';
        this._app.listen( port, host, () => {
            if ( "localhost" === host ||
                "127.0.0.1" === host ||
                host.startsWith( "192." ) )
                
                message = `Servidor local en línea: http://${host}` +
                    `${port !== 80 ? `:${port}` : ""}`;
            else
                message = "Servidor en producción...";
            
            console.clear();
            console.log( message );
        } );
    }
}
